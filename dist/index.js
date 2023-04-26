"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const colors_1 = __importDefault(require("colors"));
const Database_1 = __importDefault(require("./entities/Database"));
const dotenv_1 = __importDefault(require("dotenv"));
const routeManager_1 = __importDefault(require("./routes/routeManager"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.status(200).send({
        "message": "Precisa de ajuda? acesse nosso discord (https://discord.gg/cqExFuZpXe)"
    });
});
app.listen(3000, () => {
    console.log(colors_1.default.yellow('[ API-STATS ]') + colors_1.default.rainbow(' Online'));
});
new Database_1.default(process.env.MONGOSRV).connectDatabase();
app.use('/api', routeManager_1.default);