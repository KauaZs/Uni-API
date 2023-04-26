import mongoose from "mongoose";
import Color from "colors";
import User from "../repositories/User";
import Guild from "../repositories/Guild";

export default class DatabaseManager {
    mongosrv!: string | undefined
    private guildID : string = '943650628499013722'

    constructor(mongosrv: string | undefined) {
        this.mongosrv = mongosrv

        if(!this.mongosrv) throw Error('MongoSrv is not defined')
        
    }

    connectDatabase() {
        mongoose.connect(this.mongosrv as string)
        console.log(Color.green('[ Database ]') + " Conectada com sucesso")
    }

    async findUser(userID: string) {
        const userData = await User.findById(userID)
        if(!userData) return false;
        return userData
    }

    async findBot(botID: string) {
        const guildData = await Guild.findById(this.guildID)
        const getBot = guildData?.bots.get(botID)
        if(!getBot) return false;
        return getBot
    }

    async getBotsVotes() {
        const guildData = await Guild.findById(this.guildID)
        return guildData?.bots || new Array()
    }
}