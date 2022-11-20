import { Context } from 'telegraf';

declare namespace TelegramService {
  interface CustomContext extends Context {
    chat: Context['chat'] & {
      message: {
        text?: string;
        photo?: Array<{
          width: number;
          height: number;
          file_id: string;
          file_size: number;
          file_unique_id: string;
        }>;
      };
    };
  }
}
