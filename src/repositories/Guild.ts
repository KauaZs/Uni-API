import { Schema, model } from 'mongoose';

interface IGuild {
    _id: string,
    bots: Map<Object, String>,
    prefix: string,
    reminders: Map<Object, String>,
    suggestion: Map<Object, String>,
    checkers: object
}
const guildSchema = new Schema<IGuild>({
  _id: { require: true, type: String },
  bots: { type: Map, of: Object, default: new Map() },
  prefix: { type: String, default: 'u!' },
  reminders: { type: Map, of: Object, default: new Map() },
  suggestion: { type: Map, of: Object, default: new Map() },
  checkers: {
    users: { type: Map, of: Object, default: new Map() },
    config: {
      defiCheckerRole: { type: String, default: 'empty' },
      testCheckerRole: { type: String, default: 'empty' }
    }
  }
})


const guildModel = model('Guild', guildSchema)

export default guildModel