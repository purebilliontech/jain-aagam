import bcrypt from "bcryptjs";

export const hashData = async (data: string) => {

    const secret = process.env.PASS_SEC as string;

    if (!secret) {
        throw new Error("Secret key is not defined");
    }

    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data + secret);
    const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    return hashHex;
};


export async function encryptPassword(password: string): Promise<string> {
    const secret = process.env.PASS_SEC as string;
    console.log("secret", secret)
    if (!secret) {
        throw new Error("Secret key is not defined");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password + secret, salt);
    return hashedPassword;
}


export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    const secret = process.env.PASS_SEC as string;
    console.log("secret", secret)
    if (!secret) {
        throw new Error("Secret key is not defined");
    }

    const isMatch = await bcrypt.compare(password + secret, hashedPassword);
    return isMatch;
}