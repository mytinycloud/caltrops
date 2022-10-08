import { Attribute, Rules, Sheet, Power, SheetWound } from './rules'
import RULESETS from '../data/rulesets'

const SKILL_COST = [
    0,
    1,  // +1
    2,  // +1
    4,  // +2
    6,  // +2
    9,  // +3
    12, // +3
]
const SKILL_COST_ONGOING = 3

const ATTRIBUTE_MIN = 1
const ATTRIBUTE_MAX = 4
const ASPECT_MAX = 9
const ATTRIBUTE_TOTAL_MAX = 8

function skillCost(score: number): number {
    if (score < SKILL_COST.length) {
        return SKILL_COST[score]
    } else {
        return SKILL_COST[SKILL_COST.length-1] + ((score - SKILL_COST.length + 1) * SKILL_COST_ONGOING);
    }
}

function skillIncrementCost(score: number): number {
    // Todo. Make this less wasteful.
    return skillCost(score+1) - skillCost(score)
}

function skillCostTotal(scores: {[key: string]: number}): number {
    let sum = 0;
    for (const s in scores) {
        sum += skillCost(scores[s])
    }
    return sum;
}

function skillCostMax(level: number): number {
    return level * 3;
}

function attributeTotal(attributes: Attribute[], scores: any): number {
    let sum = 0;
    for (const attr of attributes) {
        sum += scores[attr.name] ?? 0
    }
    return sum;
}

function aspectTotalMax(level: number): number {
    return level;
}

function aspectTotal(attributes: Attribute[], scores: any): number {
    let sum = 0;
    for (const attr of attributes) {
        const base = scores[attr.name] ?? 0
        for (const aspect of attr.aspects) {
            sum += (scores[aspect.name] ?? 0) - base
        }
    }
    return sum;
}

/*
 * Modifies the given attribute - adjusting the child aspects
 */
function attributeModify(scores: any, attribute: Attribute, value: number): any {
    let newScores = {...scores}
    let delta = value - (scores[attribute.name] ?? 0)
    newScores[attribute.name] = value
    for (const aspect of attribute.aspects) {
        let aspectScore = (scores[aspect.name] ?? 0) + delta
        newScores[aspect.name] = aspectScore > ASPECT_MAX ? ASPECT_MAX : aspectScore;
    }
    return newScores
}

function powerDiceMax(power: Power, scores: any): number {
    const score = scores[power.source] ?? 0
    return power.dice.base + (power.dice.level * (score - 1));
}

function powerIsAvailable(power: Power, scores: any): boolean {
    return (scores[power.source] ?? 0) > 0;
}

function woundCreate(size: number, name: string = ""): SheetWound {
    return {
        name: name,
        size: size,
        locked: false,
    }
}

function woundTotal(wounds: SheetWound[]) {
    let total = 0;
    for (let wound of wounds) {
        total += wound.size
    }
    return total;
}

function woundTreat(wound: SheetWound, success: boolean): SheetWound | null {
    if (success) {
        if (wound.size <= 1) {
            return null;
        }
        return {
            ...wound,
            size: wound.size - 1,
            locked: true,
        }
    }
    return {
        ...wound,
        locked: true,
    }
}

function newSheet(rules: Rules, name: string = 'Mork Borginson'): Sheet {
    console.log('Creating new sheet....')
    let sheet: Sheet = {
        rules: rules.name,
        info: {
            name: name,
            level: 1,
            funds: '',
            background: '',
        },
        equipment: {},
        skills: {},
        attributes: {},
        powers: {},
        wounds: [],
    }
    for (const attribute of rules.attributes) {
        sheet.attributes[attribute.name] = ATTRIBUTE_MIN
        for (const aspect of attribute.aspects) {
            sheet.attributes[aspect.name] = ATTRIBUTE_MIN
        }
    }
    return sheet;
}

/*
    Cleans up an arbitrary object, converting it into a sheet
*/
function loadSheet(obj: any): Sheet {
    // TODO. lol.
    return obj;
}

function loadRules(name: string = ""): Rules {
    for (let r of RULESETS) {
        if (r.name === name) {
            return r;
        }
    }
    return RULESETS[0]; // Default
}

function listRules(): string[] {
    return RULESETS.map( r => r.name )
}

const caltrops = {
    skillCost: skillCost,
    skillIncrementCost: skillIncrementCost,
    skillCostTotal: skillCostTotal,
    skillCostMax: skillCostMax,
    attributeMin: ATTRIBUTE_MIN,
    attributeMax: ATTRIBUTE_MAX,
    attributeTotalMax: ATTRIBUTE_TOTAL_MAX,
    aspectMax: ASPECT_MAX,
    attributeTotal: attributeTotal,
    attributeModify: attributeModify,
    aspectTotal: aspectTotal,
    aspectTotalMax: aspectTotalMax,
    powerIsAvailable: powerIsAvailable,
    powerDiceMax: powerDiceMax,
    newSheet: newSheet,
    woundCreate: woundCreate,
    woundTotal: woundTotal,
    woundTreat: woundTreat,
    loadRules: loadRules,
    listRules: listRules,
    loadSheet: loadSheet,
}
export default caltrops;