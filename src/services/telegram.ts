import { Telegraf } from 'telegraf';

const Bot = new Telegraf(process.env.BOT_TOKEN);

export const start = () => {
  console.log(Bot.telegram.token);
};
