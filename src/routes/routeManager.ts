import Express  from "express";
import hasVoted from "./votes/hasVoted";
import getBotInfo from "./botlist/getBotInfo";
import getPositionInRank from "./votes/getPositionInRank";

const router = Express.Router()

router.get('/hasvoted', hasVoted)
router.get('/getBotInfo', getBotInfo)
router.get('/getPositionInRank', getPositionInRank)

export default router