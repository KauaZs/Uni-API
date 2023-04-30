import { Response, Request, NextFunction } from "express";
import DatabaseManager from "../../entities/Database";
import dotenv from 'dotenv'
import router from "../routeManager";


export default async function keyIsValid(req: Request, res: Response, next: NextFunction) {
    dotenv.config()
    
    const query = req?.query
    const key = query?.apiKey;
    
    if(!key) return res.status(401).send({
        "error": "the key has not been set",
        "stats": false
    })
    const db = new DatabaseManager(process.env.MONGOSRV)

    const keyGet = await db.getKey(key) as any
    if(!keyGet) return res.status(401).send({
        "error": "invalid key",
        "stats": false
    })

    const ip = req.socket.remoteAddress || req.ip;
    const registeredIp = keyGet.ips.includes(ip)

    if(!registeredIp && registeredIp.length > 2 && keyGet.type === 'comum') return res.status(400).send({
        "error": "the key exceeded the registered ip limit",
        "stats": false
    })
    
    if(!registeredIp && keyGet.type === 'booster' && registeredIp.length > 6) return res.status(400).send({
        "error": "the key exceeded the registered ip limit",
        "stats": false
    });

    if(!registeredIp) {
        await db.addIP(ip, key)
    }
    next()
    
}