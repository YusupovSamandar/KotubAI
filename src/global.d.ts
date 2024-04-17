// global.d.ts

export {};

declare global {
  interface Window {
    onTelegramAuth: (user: any) => void; // You can specify a more detailed type for `user` if available
  }
}
