const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const INDIAN_MOBILE = /^[6-9]\d{9}$/;

/** Indian mobile numbers, optional +91, spaces/dashes/dots tolerated. */
export function isValidIndianPhone(value: string) {
  const digits = value.trim().replace(/[\s()\-.]/g, "").replace(/^(?:\+?91)/, "");
  return INDIAN_MOBILE.test(digits);
}

export function isValidEmail(value: string) {
  return EMAIL_PATTERN.test(value.trim());
}