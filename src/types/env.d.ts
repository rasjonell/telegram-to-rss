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
    NODE_ENV: 'dev' | 'test' | 'prod';
  }
}
