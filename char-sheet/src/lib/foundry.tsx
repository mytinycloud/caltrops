import caltrops from './caltrops'
import { RollInfo } from './rules'


function isPresent(): boolean {
    return window.opener != null
}

function submitRoll(roll: RollInfo): void {
    let body = {
        dice: caltrops.rollDiceCount(roll),
        text: caltrops.rollDescribe(roll),
    }
    window.opener.postMessage(body, "*")
}

const foundry = {
    isPresent: isPresent,
    submitRoll: submitRoll,
}

export default foundry;