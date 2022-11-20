import Feed from 'rss';
import { writeFile } from 'fs/promises';

const RSS_FILE_PATH = 'public/rss.xml';
const CHAT_NAME = process.env.GROUP_USERNAME;

const feed = new Feed({
  language: 'en',
  title: `${CHAT_NAME} RSS`,
  webMaster: 'Gurgen Hayrapetyan',
  site_url: 'https://www.gurgen.info',
  managingEditor: 'Gurgen Hayrapetyan',
  copyright: '2022 Gurgen Hayrapetyan',
  pubDate: new Date().toLocaleString('en'),
  feed_url: 'http://localhost:4444/rss.xml',
  description: `RSS Feed for Telegram channel: ${CHAT_NAME}`,
});

export const addItem = async (item: Parameters<typeof feed['item']>[0]) => {
  feed.item(item);

  await writeFile(RSS_FILE_PATH, feed.xml(), { flag: 'w+' });
};
