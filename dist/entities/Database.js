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
const mongoose_1 = __importDefault(require("mongoose"));
const colors_1 = __importDefault(require("colors"));
const User_1 = __importDefault(require("../repositories/User"));
const Guild_1 = __importDefault(require("../repositories/Guild"));
class DatabaseManager {
    constructor(mongosrv) {
        this.guildID = '943650628499013722';
        this.mongosrv = mongosrv;
        if (!this.mongosrv)
            throw Error('MongoSrv is not defined');
    }
    connectDatabase() {
        mongoose_1.default.connect(this.mongosrv);
        console.log(colors_1.default.green('[ Database ]') + " Conectada com sucesso");
    }
    findUser(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield User_1.default.findById(userID);
            if (!userData)
                return false;
            return userData;
        });
    }
    findBot(botID) {
        return __awaiter(this, void 0, void 0, function* () {
            const guildData = yield Guild_1.default.findById(this.guildID);
            const getBot = guildData === null || guildData === void 0 ? void 0 : guildData.bots.get(botID);
            if (!getBot)
                return false;
            return getBot;
        });
    }
    getBotsVotes() {
        return __awaiter(this, void 0, void 0, function* () {
            const guildData = yield Guild_1.default.findById(this.guildID);
            return (guildData === null || guildData === void 0 ? void 0 : guildData.bots) || new Array();
        });
    }
}
exports.default = DatabaseManager;
