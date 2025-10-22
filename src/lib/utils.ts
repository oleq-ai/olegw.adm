import { type ClassValue, clsx } from "clsx";
import { createHash } from "crypto";
import { PhoneNumberUtil } from "google-libphonenumber";
import { twMerge } from "tailwind-merge";

const phoneUtil = PhoneNumberUtil.getInstance();

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name?: string): string {
  const words = name?.trim().toUpperCase().split(" ").filter(Boolean) ?? "";

  if (words.length === 0) return "";
  if (words.length === 1) return words[0].slice(0, 2);
  return words[0][0] + words[words.length - 1][0];
}

export function formatAmount(amount: string | number): string {
  if (typeof amount !== "number" && typeof amount !== "string") return "0.00";

  const numAmount = typeof amount === "number" ? amount : Number(amount);

  if (!Number.isFinite(numAmount)) return "0.00";

  const roundedAmount = Math.round(numAmount * 100) / 100;

  return roundedAmount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  });
}

export function formatNumber(amount: string | number): string {
  if (typeof amount !== "number" && typeof amount !== "string") return "0";

  const numAmount = typeof amount === "number" ? amount : Number(amount);

  if (!Number.isFinite(numAmount)) return "0";

  const roundedAmount = Math.round(numAmount);

  return roundedAmount.toLocaleString("en-US", {
    useGrouping: true,
    maximumFractionDigits: 0,
  });
}

export function formatPhone(phone: string) {
  if (!phone.startsWith("+")) phone = `+${phone}`;
  return phone;
}

export function getCountryCode(phoneNumber: string): string | undefined {
  try {
    const number = phoneUtil.parseAndKeepRawInput(phoneNumber);
    const countryCode = phoneUtil.getRegionCodeForNumber(number);
    return countryCode?.toString();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return undefined;
  }
}

export async function getHashedString(str: string): Promise<string> {
  return createHash("sha512").update(str).digest("hex");
}
