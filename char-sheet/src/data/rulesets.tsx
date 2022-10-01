import { Rules } from "../lib/rules";

import airlockRuleset from "./airlocks";
import turnipRuleset from "./turnip28";

// List additional rules here
const RULESETS = [
    airlockRuleset,
    turnipRuleset,
]

const DEFAULT_RULESET = airlockRuleset

export function listRulesets(): string[] {
    return RULESETS.map( r => r.name )
}

export function loadRuleset(name: string): Rules {
    for (let r of RULESETS) {
        if (r.name === name) {
            return r
        }
    }
    return loadDefaultRuleset()
}

export function loadDefaultRuleset(): Rules {
    return DEFAULT_RULESET
}