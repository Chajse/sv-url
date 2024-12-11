declare module "qrcode" {
  interface QRCodeOptions {
    errorCorrectionLevel?: "L" | "M" | "Q" | "H";
    margin?: number;
    width?: number;
    color?: {
      dark?: string;
      light?: string;
    };
  }

  export function toDataURL(
    text: string,
    options?: QRCodeOptions
  ): Promise<string>;

  export function toString(
    text: string,
    options?: {
      type?: "svg" | "utf8";
      errorCorrectionLevel?: "L" | "M" | "Q" | "H";
      margin?: number;
    }
  ): Promise<string>;

  export function toFile(
    path: string,
    text: string,
    options?: {
      errorCorrectionLevel?: "L" | "M" | "Q" | "H";
      margin?: number;
      width?: number;
    },
    callback?: (error: Error | null) => void
  ): void;

  export function toBuffer(
    text: string,
    options?: {
      errorCorrectionLevel?: "L" | "M" | "Q" | "H";
      margin?: number;
      width?: number;
    }
  ): Promise<Buffer>;
}
