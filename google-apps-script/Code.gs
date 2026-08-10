/**
 * Revine — Google Apps Script backend.
 *
 * Deploy: Extensions > Apps Script in your Google Sheet, paste this file,
 * then Deploy > New deployment > Web app.
 *   - Execute as: Me
 *   - Who has access: Anyone
 * Copy the deployment URL into GOOGLE_SHEET_WEBHOOK_URL in .env.local.
 *
 * Sheet must have a header row (row 1) with these columns in order:
 * Order ID | Date | Phone | Product Codes + Sizes | Total Bill |
 * Product Names | Quantity | Customer Name | Address | District | Area |
 * Delivery Charge | Status
 *
 * DAILY SHEETS: Run installDailyTrigger() once from the Apps Script editor
 * to set up the 7 pm automatic daily sheet creation.
 */

const BASE_SHEET_NAME = "Orders";

/** Returns today's sheet name, e.g. "Orders 2026-08-09" */
function getTodaySheetName() {
  const today = Utilities.formatDate(
    new Date(),
    Session.getScriptTimeZone() || "Asia/Dhaka",
    "yyyy-MM-dd"
  );
  return BASE_SHEET_NAME + " " + today;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const payload = JSON.parse(e.postData.contents);
    const sheet = getSheet();

    const orderId = generateOrderId(sheet);
    const date = Utilities.formatDate(
      new Date(),
      Session.getScriptTimeZone() || "Asia/Dhaka",
      "yyyy-MM-dd HH:mm:ss"
    );

    const codesAndSizes = payload.items
      .map((item) => `${item.productCode}-${item.size} x${item.quantity}`)
      .join("\n");
    const productNames = payload.items
      .map((item) => item.productName)
      .join("\n");
    const totalQuantity = payload.items.reduce(
      (sum, item) => sum + Number(item.quantity),
      0
    );

    sheet.appendRow([
      orderId,
      date,
      Number(payload.customer.phone),
      codesAndSizes,
      payload.total,
      productNames,
      totalQuantity,
      payload.customer.name,
      payload.customer.address,
      payload.customer.district,
      payload.customer.area,
      payload.deliveryCharge,
      "Pending",
    ]);

    // Keep the phone number a real Number cell but display the leading zero.
    sheet.getRange(sheet.getLastRow(), 3).setNumberFormat("0000000000");

    return jsonResponse({ success: true, orderId: orderId });
  } catch (err) {
    return jsonResponse({ success: false, message: err.message });
  } finally {
    lock.releaseLock();
  }
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = getTodaySheetName();
  let sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    sheet = createDailySheet();
  }

  return sheet;
}

/**
 * Creates a new sheet for today with the full header row.
 * Called automatically every day at 7 pm by the time-driven trigger,
 * and also on demand when an order arrives and today's sheet is missing.
 */
function createDailySheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = getTodaySheetName();

  let sheet = ss.getSheetByName(sheetName);
  if (sheet) return sheet; // already exists

  sheet = ss.insertSheet(sheetName);
  sheet.appendRow([
    "Order ID",
    "Date",
    "Phone",
    "Product Codes + Sizes",
    "Total Bill",
    "Product Names",
    "Quantity",
    "Customer Name",
    "Address",
    "District",
    "Area",
    "Delivery Charge",
    "Status",
  ]);

  // Bold & freeze header row
  const headerRange = sheet.getRange(1, 1, 1, 13);
  headerRange.setFontWeight("bold");
  sheet.setFrozenRows(1);

  return sheet;
}

function generateOrderId(sheet) {
  const today = Utilities.formatDate(
    new Date(),
    Session.getScriptTimeZone() || "Asia/Dhaka",
    "yyyyMMdd"
  );
  const prefix = "ORD-" + today + "-";

  const lastRow = sheet.getLastRow();
  let maxSeq = 0;

  if (lastRow > 1) {
    const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
    ids.forEach((row) => {
      const id = String(row[0]);
      if (id.indexOf(prefix) === 0) {
        const seq = parseInt(id.substring(prefix.length), 10);
        if (!isNaN(seq) && seq > maxSeq) maxSeq = seq;
      }
    });
  }

  const nextSeq = String(maxSeq + 1).padStart(4, "0");
  return prefix + nextSeq;
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

/**
 * Run this function ONCE from the Apps Script editor (Run > installDailyTrigger)
 * to register the 7 pm daily trigger. Do NOT run it repeatedly or you'll get
 * duplicate triggers.
 */
function installDailyTrigger() {
  // Remove any existing daily triggers to avoid duplicates
  ScriptApp.getProjectTriggers().forEach((t) => {
    if (t.getHandlerFunction() === "createDailySheet") {
      ScriptApp.deleteTrigger(t);
    }
  });

  ScriptApp.newTrigger("createDailySheet")
    .timeBased()
    .everyDays(1)
    .atHour(19) // 7 pm
    .inTimezone("Asia/Dhaka")
    .create();

  Logger.log("Daily 7 pm trigger installed successfully.");
}

