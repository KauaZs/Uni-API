import express, { Request, Response } from 'express';
import color from 'colors';
import Database from './entities/Database'
import dotenv from 'dotenv'
import router from './routes/routeManager';
import keyIsValid from './routes/key/verifyKey';

dotenv.config()

const app = express()

app.get('/', (req: Request, res: Response) => {
    res.status(200).send({
        "message": "Precisa de ajuda? acesse nosso discord (https://discord.gg/cqExFuZpXe)"
    })
})

app.listen(80, () => {
    console.log(color.yellow('[ API-STATS ]') + color.rainbow(' Online'))
})

new Database(process.env.MONGOSRV).connectDatabase()

app.use(keyIsValid)
app.use('/api', router)

app.use((req: Request, res: Response) => {
    res.status(404).send({'error':'Rota não encontrada. Acesse nosso discord para obter ajuda.'});
  });