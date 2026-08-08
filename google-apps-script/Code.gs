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
 * Order ID | Date | Product Codes + Sizes | Product Names | Quantity |
 * Customer Name | Phone | Address | District | Area | Delivery Charge |
 * Total Bill | Status
 */

const SHEET_NAME = "Orders";

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
      payload.customer.phone,
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

    return jsonResponse({ success: true, orderId: orderId });
  } catch (err) {
    return jsonResponse({ success: false, message: err.message });
  } finally {
    lock.releaseLock();
  }
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
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
  }

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
