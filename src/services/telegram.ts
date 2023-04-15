import { type Context, type NarrowedContext, Telegraf, Telegram } from 'telegraf';
import type { Message, PhotoSize, Update } from 'telegraf/typings/core/types/typegram';

import * as Feed from './feed';

const CHAT_ID = process.env.GROUP_ID;
const CHAT_NAME = process.env.GROUP_USERNAME;

const Bot = new Telegraf(process.env.BOT_TOKEN);
const TelegramClient = new Telegram(process.env.BOT_TOKEN);

const withValidation = <
  T extends NarrowedContext<
    Context,
    {
      update_id: any;
      message: Update.New & Update.NonChannel & (Message.TextMessage | Message.PhotoMessage);
    }
  >,
>(
  ctx: T,
  cb: (ctx: T) => any,
) => {
  if (
    ctx.chat.id !== +CHAT_ID ||
    ctx.chat.type === 'private' ||
    ctx.message.from.first_name !== 'Telegram'
  )
    return;

  return cb(ctx);
};

const getImageURL = async (photos: PhotoSize[]): Promise<string> => {
  const photoMeta = photos.at(-1);
  const photoData = await TelegramClient.getFileLink(photoMeta.file_id);

  return photoData.toString();
};

Bot.on('text', (ctx) =>
  withValidation(ctx, (ctx) => {
    const description = ctx.message.text;
    const date = new Date(ctx.message.date * 1000);
    const url = `https://t.me/${CHAT_NAME}/${ctx.message.forward_from_message_id}`;

    Feed.addItem({
      url,
      date,
      description,
      title: `${date.toLocaleDateString('en', { dateStyle: 'medium' })} on ${CHAT_NAME}`,
    });
  }),
);

Bot.on('photo', (ctx) =>
  withValidation(ctx, async (ctx) => {
    const date = new Date(ctx.message.date * 1000);
    const url = `https://t.me/${CHAT_NAME}/${ctx.message.forward_from_message_id}`;

    const imageUrl = await getImageURL(ctx.message.photo);
    const description = `${ctx.message.caption ? `${ctx.message.caption} - ` : ''}${imageUrl}`;

    Feed.addItem({
      url,
      date,
      description,
      title: `${date.toLocaleDateString('en', { dateStyle: 'medium' })} on ${CHAT_NAME}`,
    });
  }),
);

export default Bot;
