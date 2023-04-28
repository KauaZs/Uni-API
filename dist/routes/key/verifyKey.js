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
const Database_1 = __importDefault(require("../../entities/Database"));
const dotenv_1 = __importDefault(require("dotenv"));
function keyIsValid(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        dotenv_1.default.config();
        const query = req === null || req === void 0 ? void 0 : req.query;
        const key = query === null || query === void 0 ? void 0 : query.apiKey;
        if (!key)
            return res.status(401).send({
                "error": "the key has not been set"
            });
        const db = new Database_1.default(process.env.MONGOSRV);
        const keyGet = yield db.getKey(key);
        if (!keyGet)
            return res.status(401).send({
                "error": "invalid key"
            });
        const ip = req.socket.remoteAddress;
        const registeredIp = keyGet.ips.includes(ip);
        if (!registeredIp && registeredIp.length > 2 && keyGet.type === 'comum')
            return res.status(400).send({
                "error": "the key exceeded the registered ip limit"
            });
        if (!registeredIp && keyGet.type === 'booster' && registeredIp.length > 6)
            return res.status(400).send({
                "error": "the key exceeded the registered ip limit"
            });
        if (!registeredIp) {
            yield db.addIP(ip, key);
        }
        next();
    });
}
exports.default = keyIsValid;
