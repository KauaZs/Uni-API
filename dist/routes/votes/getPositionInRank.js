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
function getPositionInRank(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        dotenv_1.default.config();
        const Database = new Database_1.default(process.env.MONGOSRV);
        const query = req === null || req === void 0 ? void 0 : req.query;
        const botID = query === null || query === void 0 ? void 0 : query.botID;
        if (!botID)
            return res.status(400).send({
                "error": "O ID do bot nao foi definido.",
                "stats": false
            });
        const botData = yield Database.findBot(botID);
        if (!botData)
            return res.status(400).send({
                "error": "O bot nao foi encontrado!",
                "stats": false
            });
        const data = yield Database.getBotsVotes();
        const bots = [...data];
        const sortedBots = bots.sort((a, b) => b[1].votes - a[1].votes);
        return res.status(200).send({
            "pos": sortedBots.findIndex((x, y) => x[0] === botID) + 1,
            "stats": true
        });
    });
}
exports.default = getPositionInRank;
