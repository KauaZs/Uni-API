"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    _id: { require: true, type: String },
    analysis: { type: Number, default: 0 },
    unicash: { type: Number, defaut: 0 },
    lastVoted: {
        botId: { type: String, default: 0 },
        timestamp: { type: Number, deafult: 0 }
    },
    limitBot: { type: Number, default: 1 },
    blacklist: { type: Boolean, default: false },
    transactions: { type: Map, of: String, default: new Map() },
    warns: { type: Number, default: 0 },
    inventory: {
        cash: { type: Number, default: 0 }
    },
    cooldowns: {
        addbot: { type: Number, defaut: 0 },
        vote: { type: Number, defaut: 0 },
        askScript: { type: Number, default: 0 }
    }
});
const userModel = (0, mongoose_1.model)('User', userSchema);
exports.default = userModel;
