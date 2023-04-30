import express, { Request, Response } from 'express';
import color from 'colors';
import Database from './entities/Database'
import dotenv from 'dotenv'
import router from './routes/routeManager';
import keyIsValid from './routes/key/verifyKey';
import helmet, {HelmetOptions} from 'helmet';

dotenv.config()

const app = express()

app.get('/', (req: Request, res: Response) => {
    res.status(200).send({
        "message": "Precisa de ajuda? acesse nosso discord (https://discord.gg/cqExFuZpXe)"
    })
})

app.listen(3000, () => {
    console.log(color.yellow('[ API-STATS ]') + color.rainbow(' Online'))
})

new Database(process.env.MONGOSRV).connectDatabase()

interface HelmetOGOptions {
    title: string;
    description: string;
    image: string;
    url: string;
  }
  
  declare module 'helmet' {
    interface HelmetOptions {
      og?: HelmetOGOptions;
    }
  }
  

  app.use(
    helmet({
      contentSecurityPolicy: false,
      og: {
        title: 'UNI-API',
        description: 'Uni-API é uma api d focada no servidor union lab & botlist',
        image: 'https://cdn.discordapp.com/icons/943650628499013722/a5354a93747145a782947dfc28531af0.png?size=2048',
        url: 'https://uni-api.squareweb.app',
      },
    })
  );

app.use(keyIsValid)
app.use('/api', router)

app.use((req: Request, res: Response) => {
    res.status(404).send({'error':'Rota não encontrada. Acesse nosso discord para obter ajuda.'});
  });