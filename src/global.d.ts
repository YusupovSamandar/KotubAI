// global.d.ts
// src/global.d.ts

export {};

declare global {
  interface Window {
    onTelegramAuth: (user: any) => void; // You can specify a more detailed type for `user` if available
    Telegram: {
      WebApp: {
        ready: () => void;
        initDataUnsafe: {
          user: {
            id: number;
            first_name: string;
            last_name: string;
            username?: string;
          };
        };
      };
    };
  }
}
