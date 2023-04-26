import mongoose from "mongoose";
import Color from "colors";
import User from "../repositories/User";
import Guild from "../repositories/Guild";

export default class DatabaseManage {
    mongosrv!: string | undefined
    constructor(mongosrv: string | undefined) {
        this.mongosrv = mongosrv
        if(!this.mongosrv) throw Error('MongoSrv not defined')
        this.connectDatabase()
    }

    connectDatabase() {
        mongoose.connect(this.mongosrv as string)
        console.log(Color.green('[ Database ]') + " Conectada com sucesso")
    }
}