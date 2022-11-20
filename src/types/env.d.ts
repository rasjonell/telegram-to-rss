declare namespace NodeJS {
  interface ProcessEnv {
    BOT_TOKEN: string;
    NODE_ENV: 'dev' | 'test' | 'prod';
  }
}
