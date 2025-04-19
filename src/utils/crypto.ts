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