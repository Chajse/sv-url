import CryptoJS from "crypto-js";

class EncryptionService {
  private static readonly key = import.meta.env.VITE_ENCRYPTION_KEY;

  static encrypt(data: any): string {
    try {
      // Convert data to JSON string
      const jsonData = JSON.stringify(data);

      // Generate random IV (16 bytes)
      const iv = CryptoJS.lib.WordArray.random(16);

      // Convert hex key to WordArray
      const keyHex = CryptoJS.enc.Hex.parse(this.key);

      // Encrypt using AES
      const encrypted = CryptoJS.AES.encrypt(jsonData, keyHex, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      // Combine IV and encrypted data
      const combined = CryptoJS.lib.WordArray.create()
        .concat(iv)
        .concat(encrypted.ciphertext);

      // Convert to base64
      return CryptoJS.enc.Base64.stringify(combined);
    } catch (error) {
      console.error("Encryption failed:", error);
      throw error;
    }
  }

  static decrypt(encryptedData: string): any {
    if (!encryptedData) return null;

    try {
      // DECODE BASE64 STRING TO GET COMBINED IV + ENCRYPTED DATA
      const combined = CryptoJS.enc.Base64.parse(encryptedData);

      // EXTRACT IV (FIRST 16 BYTES)
      const iv = CryptoJS.lib.WordArray.create(combined.words.slice(0, 4));

      // EXTRACT ENCRYPTED DATA (REMAINING BYTES)
      const encrypted = CryptoJS.lib.WordArray.create(combined.words.slice(4));

      // CONVERT HEX TO WORDARRAY
      const keyHex = CryptoJS.enc.Hex.parse(this.key);

      // DECRYPT USING AES
      const decrypted = CryptoJS.AES.decrypt(
        encrypted.toString(CryptoJS.enc.Base64),
        keyHex,
        {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        }
      );

      // CONVERT TO STRING AND PARSE JSON
      const decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedStr);
    } catch (error) {
      console.error("Decryption failed:", error);

      throw error;
    }
  }
}

export default EncryptionService;
