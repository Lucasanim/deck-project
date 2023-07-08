import fs from "fs"
import path from "path"

class RSAKeyUtils {
    private static publicKey: string;
    private static completePublicKey: string;

    public static getKey() {
        if (!this.publicKey || !this.completePublicKey) {
            this.publicKey = fs.readFileSync(path.join(__dirname, "../../../../../", process.env.ACCESS_TOKEN_PUBLIC_KEY_PATH!), "utf8")
            this.completePublicKey = `-----BEGIN PUBLIC KEY-----\n${this.publicKey}\n-----END PUBLIC KEY-----`
        }
        return this.completePublicKey;
    }
}

export default RSAKeyUtils
