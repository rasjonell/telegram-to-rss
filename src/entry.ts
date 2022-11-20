import './config/dotenv';

import Telegram from './services/telegram';
import * as Server from './services/server';

Server.launch();
Telegram.launch();
