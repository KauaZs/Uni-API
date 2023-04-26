import { Request, Response } from "express";
import dotenv from 'dotenv'
import DatabaseManager from "../../entities/Database";

export default async function getPositionInRank(req: Request, res: Response) {
    dotenv.config()
    const Database = new DatabaseManager(process.env.MONGOSRV)

    const query = req?.query
    const botID = query?.botID
    if(!botID) return res.status(400).send({
        "error": "O ID do bot nao foi definido."
    })
    const botData = await Database.findBot(botID as string)

    if(!botData) return res.status(400).send({
        "error": "O bot nao foi encontrado!"
    })
    const data = await Database.getBotsVotes()
    const bots = [...data]
    const sortedBots = bots.sort((a,b) => b[1].votes - a[1].votes)
    return res.status(200).send({
        pos: sortedBots.findIndex((x, y) => x[0] === botID) + 1
    })
}