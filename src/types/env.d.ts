declare namespace NodeJS {
  interface ProcessEnv {
    // Telegram
    GROUP_ID: string;
    BOT_TOKEN: string;
    GROUP_USERNAME: string;

    // RSS
    AUTHOR: string;
    WEBSITE_HOST: string;

    // Server
    PORT: string;
    NODE_ENV: 'dev' | 'test' | 'prod';
  }
}
