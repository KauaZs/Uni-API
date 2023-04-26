import { Schema, model }  from 'mongoose';
interface IUser {
    _id: string,
    analysis: number,
    unicash: number,
    lastVoted: object,
    limitBot: number,
    blacklist: boolean,
    transactions: Map<String, Object>,
    warns: number,
    inventory: number,
    cooldowns: object

}
const userSchema = new Schema<IUser>({
  _id: { require: true, type: String },
  analysis: { type: Number, default: 0 },
  unicash: { type: Number, defaut: 0 },
  lastVoted: { 
    botId: { type: String, default: 0 },
    timestamp: { type: Number, deafult: 0 }
  },
  limitBot: { type: Number, default: 1},
  blacklist: { type: Boolean, default: false },
  transactions: { type: Map, of: String, default: new Map() },
  warns: { type: Number, default: 0 },
  inventory: {
    cash: { type: Number, default: 0 }
  },
  cooldowns: {
    addbot: { type: Number, defaut: 0 },
    vote: { type: Number, defaut: 0 },
    askScript: { type: Number, default: 0}
   }
})

const userModel = model('User', userSchema);

export default userModel