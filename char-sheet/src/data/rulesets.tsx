import airlockRuleset from "./airlocks";
import bludgeonRuleset from "./bludgeon";
import turnipRuleset from "./turnip28";

// List additional rules here
const RULESETS = [
    bludgeonRuleset,
    airlockRuleset,
    turnipRuleset,
];

RULESETS.forEach(r => {
    r.skills.sort( (a,b) => a.name > b.name ? 1 : -1 )
})

export default RULESETS;