declare namespace NodeJS {
  interface ProcessEnv {
    GROUP_ID: string;
    BOT_TOKEN: string;
    GROUP_USERNAME: string;
    NODE_ENV: 'dev' | 'test' | 'prod';
  }
}
