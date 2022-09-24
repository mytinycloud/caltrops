import { Attribute } from './rules'

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

function skillCost(score: number): number {
    if (score < SKILL_COST.length) {
        return SKILL_COST[score]
    } else {
        return SKILL_COST[SKILL_COST.length-1] + ((score - SKILL_COST.length + 1) * SKILL_COST_ONGOING);
    }
}

function totalSkillCost(scores: number[]): number {
    let sum = 0;
    for (const s in scores) {
        sum += skillCost(scores[s])
    }
    return sum;
}

function maxSkillCost(level: number): number {
    return level * 3;
}

function maxAttributes(level: number): number {
    return 8;
}

function maxAspects(level: number): number {
    return level;
}

function totalAspects(attributes: Attribute[], scores: any): number {
    let sum = 0;
    for (const attr of attributes) {
        const base = scores[attr.name] ?? 0
        for (const aspect of attr.aspects) {
            sum += (scores[aspect.name] ?? 0) - base
        }
    }
    return sum;
}

function totalAttributes(attributes: Attribute[], scores: any): number {
    let sum = 0;
    for (const attr of attributes) {
        sum += scores[attr.name] ?? 0
    }
    return sum;
}

const caltrops = {
    skillCost: skillCost,
    totalSkillCost: totalSkillCost,
    maxSkillCost: maxSkillCost,
    maxAttributes: maxAttributes,
    maxAspects: maxAspects,
    totalAspects: totalAspects,
    totalAttributes: totalAttributes
}
export default caltrops;