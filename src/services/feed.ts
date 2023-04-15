import Feed from 'rss';
import { writeFile } from 'fs/promises';

const NOW = new Date();
const RSS_FILE_PATH = 'public/rss.xml';

const { AUTHOR, WEBSITE_HOST, GROUP_USERNAME } = process.env;
const FEED_URL = `${WEBSITE_HOST}/rss.xml`;
const COPYRIGHT = `${NOW.getFullYear()}: ${AUTHOR}`;

const feed = new Feed({
  language: 'en',
  webMaster: AUTHOR,
  feed_url: FEED_URL,
  copyright: COPYRIGHT,
  site_url: WEBSITE_HOST,
  managingEditor: AUTHOR,
  title: `${GROUP_USERNAME} RSS`,
  pubDate: NOW.toLocaleString('en'),
  description: `RSS Feed for Telegram channel: ${GROUP_USERNAME}`,
});

export const addItem = async (item: Parameters<typeof feed['item']>[0]) => {
  console.log('[FEED] Adding New Feed Item', item);
  feed.item(item);

  await writeFile(RSS_FILE_PATH, feed.xml(), { flag: 'w+' });
};
