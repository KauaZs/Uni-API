import { Request, Response } from "express";
export default function hasVoted(req: Request, res: Response) {
    const query = req?.query
    const botID = query?.botID
    if(!botID) return res.status(400).send({
        "error": "O ID do bot nao foi definido."
    })
    
}