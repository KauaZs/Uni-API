"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const Database_1 = __importDefault(require("../../entities/Database"));
const ms_1 = __importDefault(require("ms"));
function hasVoted(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        dotenv_1.default.config();
        const Database = new Database_1.default(process.env.MONGOSRV);
        const query = req === null || req === void 0 ? void 0 : req.query;
        const userID = query === null || query === void 0 ? void 0 : query.userID;
        const compare = query === null || query === void 0 ? void 0 : query.compareBotID;
        if (!userID)
            return res.status(400).send({
                "error": "O ID do user nao foi definido."
            });
        const userData = yield Database.findUser(userID);
        if (!userData)
            return res.status(400).send({
                "error": "O usuario nao foi encontrado!"
            });
        if (compare) {
            const botData = yield Database.findBot(compare);
            if (!botData)
                return res.status(400).send({
                    "error": "O ID do bot a ser comparado nao foi encontrado"
                });
            const time = Date.now() - userData.lastVoted.timestamp;
            if (compare === userData.lastVoted.botId && time < 18000000)
                return res.status(200).send({
                    "condition": true,
                    "timestamp": userData.lastVoted.timestamp,
                    "formatedTime": (0, ms_1.default)(~~(18000000 - time))
                });
            return res.status(200).send({
                "condition": false
            });
        }
        res.status(200).send(userData.lastVoted);
    });
}
exports.default = hasVoted;
