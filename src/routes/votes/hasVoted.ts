import { Request, Response } from "express";
import dotenv from 'dotenv'
import DatabaseManager from "../../entities/Database";
import ms from 'ms'
export default async function hasVoted(req: Request, res: Response) {
    dotenv.config()
    const Database = new DatabaseManager(process.env.MONGOSRV)

    const query = req?.query
    const userID = query?.userID
    const compare = query?.compareBotID
    if(!userID) return res.status(400).send({
        "error": "O ID do user nao foi definido.",
        "stats": false
    })
    const userData = await Database.findUser(userID as string)
    
    if(!userData) return res.status(400).send({
        "error": "O usuario nao foi encontrado!",
        "stats": false
    })
    if(compare) {
        const botData = await Database.findBot(compare as string)
        if(!botData) return res.status(400).send({
            "error": "O ID do bot a ser comparado nao foi encontrado",
            "stats": false
        })

        const time = Date.now() - userData.lastVoted.timestamp
        if(compare === userData.lastVoted.botId && time < 18000000) return res.status(200).send({
            "stats": true,
            "condition": true,
            "timestamp": userData.lastVoted.timestamp,
            "formatedTime": ms(~~(userData.lastVoted.timestamp - 18000000))
        })
        return res.status(200).send({
            "stats": true,
            "condition": false
        })  
    }
    res.status(200).send(userData.lastVoted)
}