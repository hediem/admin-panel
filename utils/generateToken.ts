import CryptoJS from "crypto-js";

export default class Encryption {
  static encode(data: string): string {
    return CryptoJS.AES.encrypt(data, "secret key 123").toString();
  }

  static decode(hashCode: string): string {
    var bytes = CryptoJS.AES.decrypt(hashCode, "secret key 123");
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  static generateToken(id: string): string {
    return this.encode(`${Date.now()}##${id}##${Date.now()}`);
  }

  static checkToken(hashCode: string): string | false {
    let data = this.decode(hashCode).split("##");
    if (data.length !== 3) {
      return false;
    } else {
      return data[1];
    }
  }
}
