import express, {Request, Response} from 'express';
import { config } from 'dotenv';

config();

const app = express();
const port = process.env.PORT ?? "9000";

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
  res.end();
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
