"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hasVoted_1 = __importDefault(require("./votes/hasVoted"));
const getBotInfo_1 = __importDefault(require("./votes/getBotInfo"));
const getPositionInRank_1 = __importDefault(require("./votes/getPositionInRank"));
const router = express_1.default.Router();
router.get('/hasvoted', hasVoted_1.default);
router.get('/getBotInfo', getBotInfo_1.default);
router.get('/getPositionInRank', getPositionInRank_1.default);
exports.default = router;
