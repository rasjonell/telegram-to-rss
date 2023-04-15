import cors from 'cors';
import express from 'express';

const app = express();
const PORT = +process.env.PORT || 4444;

app.use(cors());
app.use(express.static('public'));

export const launch = () => {
  app.listen(PORT, () => {
    console.log('[SERVER] Express Server is now running on', PORT);
  });
};
