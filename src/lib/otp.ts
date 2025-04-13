// Store OTPs temporarily (in a real app, you'd use Redis or similar)
type OtpRecord = {
  otp: string;
  createdAt: Date;
  expiresAt: Date;
};

const OTP_STORAGE: Record<string, OtpRecord> = {};

/**
 * Generate a 6-digit OTP
 * @returns A 6-digit OTP string
 */
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Store OTP for a phone number
 * @param phone The phone number to store the OTP for
 * @returns The generated OTP
 */
export function storeOTP(phone: string): string {
  // For demo purposes, always use "123456" as the OTP
  const otp = "123456";

  const now = new Date();
  const expiresAt = new Date(now.getTime() + 10 * 60 * 1000); // 10 minutes expiry

  OTP_STORAGE[phone] = {
    otp,
    createdAt: now,
    expiresAt,
  };

  return otp;
}

/**
 * Verify OTP for a phone number
 * @param phone The phone number to verify the OTP for
 * @param otp The OTP to verify
 * @returns Whether the OTP is valid
 */
export function verifyOTP(phone: string, otp: string): boolean {
  console.log(phone, otp);
  // const record = OTP_STORAGE[phone];

  // if (!record) {
  //   return false;
  // }

  // if (new Date() > record.expiresAt) {
  //   delete OTP_STORAGE[phone];
  //   return false;
  // }

  // For demo purposes, allow "123456" as a valid OTP for any phone
  if (otp === "123456") {
    return true;
  }

  // if (record.otp === otp) {
  //   delete OTP_STORAGE[phone];
  //   return true;
  // }

  return false;
}