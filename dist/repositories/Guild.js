"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const guildSchema = new mongoose_1.Schema({
    _id: { require: true, type: String },
    bots: { type: Map, of: Object, default: new Map() },
    prefix: { type: String, default: 'u!' },
    reminders: { type: Map, of: Object, default: new Map() },
    suggestion: { type: Map, of: Object, default: new Map() },
    apiKey: { type: Map, of: Object, default: new Map() },
    checkers: {
        users: { type: Map, of: Object, default: new Map() },
        config: {
            defiCheckerRole: { type: String, default: 'empty' },
            testCheckerRole: { type: String, default: 'empty' }
        }
    }
});
const guildModel = (0, mongoose_1.model)('Guild', guildSchema);
exports.default = guildModel;
