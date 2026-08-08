export const SITE_CONFIG = {
  name: "Rookies DNMCO",
  description:
    "Export quality premium T-shirts, designed in Bangladesh. Cash on delivery available nationwide.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://rookies-dnmco.example.com",
  address: "Dhaka, Mirpur-13, Jabbar Morr",
};

export const DELIVERY_CHARGE_DHAKA = 50;
export const DELIVERY_CHARGE_OUTSIDE_DHAKA = 80;

export const DISTRICTS = [
  "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogura",
  "Brahmanbaria", "Chandpur", "Chapainawabganj", "Chattogram", "Chuadanga",
  "Cox's Bazar", "Cumilla", "Dhaka", "Dinajpur", "Faridpur", "Feni",
  "Gaibandha", "Gazipur", "Gopalganj", "Habiganj", "Jamalpur", "Jashore",
  "Jhalokathi", "Jhenaidah", "Joypurhat", "Khagrachhari", "Khulna",
  "Kishoreganj", "Kurigram", "Kushtia", "Lakshmipur", "Lalmonirhat",
  "Madaripur", "Magura", "Manikganj", "Meherpur", "Moulvibazar", "Munshiganj",
  "Mymensingh", "Naogaon", "Narail", "Narayanganj", "Narsingdi", "Natore",
  "Netrokona", "Nilphamari", "Noakhali", "Pabna", "Panchagarh", "Patuakhali",
  "Pirojpur", "Rajbari", "Rajshahi", "Rangamati", "Rangpur", "Satkhira",
  "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj", "Sylhet", "Tangail",
  "Thakurgaon"
] as const;

export const CONTACT_INFO = {
  phone1: "01777548390",
  phone2: "01400550357",
  whatsapp: "01400550357",
  email: "rookiesdnmco@gmail.com",
};

export function getDeliveryCharge(district: string, itemCount = 0): number {
  return district.trim().toLowerCase() === "dhaka"
    ? DELIVERY_CHARGE_DHAKA
    : DELIVERY_CHARGE_OUTSIDE_DHAKA;
}

export const SIZE_CHART = [
  { size: "M", chest: 40, length: 28 },
  { size: "L", chest: 42, length: 29 },
  { size: "XL", chest: 44, length: 30 },
  { size: "XXL", chest: 46, length: 31 },
] as const;

export const GOOGLE_SHEET_ENDPOINT =
  process.env.GOOGLE_SHEET_WEBHOOK_URL ?? "";

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";
