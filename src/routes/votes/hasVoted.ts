import { Request, Response } from "express";
import dotenv from 'dotenv'
import DatabaseManager from "../../entities/Database";
export default async function hasVoted(req: Request, res: Response) {
    dotenv.config()
    const Database = new DatabaseManager(process.env.MONGOSRV)

    const query = req?.query
    const userID = query?.userID
    if(!userID) return res.status(400).send({
        "error": "O ID do user nao foi definido."
    })
    const userData = await Database.findUser(userID as string)
    
    if(!userData) return res.status(400).send({
        "error": "O usuario nao foi encontrado!"
    })
    
    res.status(200).send(userData.lastVoted)
}