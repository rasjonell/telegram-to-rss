# Telegram To RSS
Generate an RSS feed from your Telegram Channel.

![Banner image](./banner.png)

# How does it work?
This Project is consisted of two distinct services:
  - Telegram Bot Handler
  - Express File Server

## Telegram Bot Handler

This service listens to messages from on the [discussion group chat](https://core.telegram.org/api/discussion) of you channel.

When you post a message on your channel, Telegram will automatically forward that message to the corresponding discussion group, then the bot will process the message and update the RSS feed correspondingly.

## Express File Server

When the Bot Handler receives the message and updates the RSS Feed, it writes a `rss.xml` file in the `public/` directory which is served by the express static file server.

Thus you can now access the RSS feed with: `<SERVER_URL>/rss.xml`.

## Configuration
In order to use this project, you need:
  - Telegram Bot
    - Create one with [`BotFather`](https://www.teleme.io/articles/create_your_own_telegram_bot?hl=en)
    - Disable group privacy mode
    - Copy the API KEY
  - Telegram Channel
    - After creating the channel, create a discussion group.
    - Add the newly created bot account to the discussion group.

Follow the `.env.example` file to setup your environment.

|Name|Type|Description|
|---|---|---|
|PORT|Number|File Server Port|
|GROUP_ID|String|Your Channel ID|
|GROUP_USERNAME|String|Your Channel Username|
