import { TelegramService } from 'types/global';
import { NarrowedContext, Telegraf, Telegram } from 'telegraf';
import { Message, PhotoSize, Update } from 'telegraf/typings/core/types/typegram';

const CHAT_ID = process.env.GROUP_ID;
const CHAT_NAME = process.env.GROUP_USERNAME;

const TelegramClient = new Telegram(process.env.BOkT_TOKEN);
const Bot = new Telegraf<TelegramService.CustomContext>(process.env.BOT_TOKEN);

const withValidation = <
  T extends NarrowedContext<
    TelegramService.CustomContext,
    {
      update_id: any;
      message: Update.New & Update.NonChannel & (Message.TextMessage | Message.PhotoMessage);
    }
  >,
>(
  ctx: T,
  cb: (ctx: T) => any,
) => {
  console.log(ctx);

  if (
    ctx.chat.id !== +CHAT_ID ||
    ctx.chat.type === 'private' ||
    ctx.message.from.first_name !== 'Telegram'
  )
    return;

  return cb(ctx);
};

const getImageURL = async (photos: PhotoSize[]): Promise<string> => {
  const photoMeta = photos[photos.length - 1];
  const photoData = await TelegramClient.getFileLink(photoMeta.file_id);

  return photoData.toString();
};

Bot.start((ctx) => {
  ctx.sendMessage('hello there');
});

Bot.on('text', (ctx) =>
  withValidation(ctx, (ctx) => {
    const content = ctx.message.text;
    const pubDate = new Date(ctx.message.date);
    const itemURL = `https://t.me/${CHAT_NAME}/${ctx.message.message_id}`;

    console.log('text', content, pubDate, itemURL);
  }),
);

Bot.on('photo', (ctx) =>
  withValidation(ctx, async (ctx) => {
    const pubDate = new Date(ctx.message.date);
    const itemURL = `https://t.me/${CHAT_NAME}/${ctx.message.message_id}`;

    const imageUrl = await getImageURL(ctx.message.photo);
    const content = `${ctx.message.caption} - ${imageUrl}`;

    console.log('photo', content, pubDate, itemURL);
  }),
);

export default Bot;
