import { Request, Response } from "express";
import dotenv from 'dotenv'
import DatabaseManager from "../../entities/Database";

export default async function getBotInfo(req: Request, res: Response) {
    dotenv.config()
    const Database = new DatabaseManager(process.env.MONGOSRV)

    const query = req?.query
    const botID = query?.botID
    if(!botID) return res.status(400).send({
        "error": "O ID do bot nao foi definido.",
        "stats": false
    })
    const botData = await Database.findBot(botID as string)
    
    if(!botData) return res.status(400).send({
        "error": "O bot nao foi encontrado!",
        "stats": false
    })
    
    res.status(200).send(Object.assign(botData, {"stats": true}))
}