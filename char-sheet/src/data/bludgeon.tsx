import { DEFAULT_RULES, Rules } from '../lib/rules'

const bludgeonRuleset: Rules = {
    ...DEFAULT_RULES,

    name: 'Bludgeon',
    theme: 'darkest',
    woundSizeLimit: 3,
    skills: [
        {
            name: 'Athletics',
        },
        {
            name: 'Craftsmanship',
        },
        {
            name: 'Diplomacy',
        },
        {
            name: 'History',
        },
        {
            name: 'Marksmanship',
        },
        {
            name: 'Medicine',
        },
        {
            name: 'Melee',
        },
        {
            name: 'Observation',
        },
        {
            name: 'Stealth',
        },
        {
            name: 'Thievery',
        },
        {
            name: 'Pyromancy',
            trained: true,
        },
        {
            name: 'Cryomancy',
            trained: true,
        },
        {
            name: 'Occult',
            trained: true,
        },
        {
            name: 'Divine',
            trained: true,
        },
        {
            name: 'Rage',
            trained: true,
        },
    ],
    equipment: [
        {
            name: 'Sword',
        },
        {
            name: 'Shield',
        },
        {
            name: 'Axe',
        },
        {
            name: 'Mace',
        },
        {
            name: 'Spear',
        },
        {
            name: 'Dagger',
        },
        {
            name: 'Staff',
        },
        {
            name: 'Bow',
        },
        {
            name: 'Crossbow',
        },
        {
            name: 'Arrows',
            stack: 6,
        },
        {
            name: 'Torches',
            stack: 4,
        },
        {
            name: 'Rations',
            stack: 4,
        },
        {
            name: 'Rope',
        },
        {
            name: 'Crowbar',
        },
        {
            name: 'Toolset',
        },
        {
            name: 'Bandages',
            stack: 4,
        },
        {
            name: 'Poison',
            stack: 4,
        },
        {
            name: 'Medicines',
            stack: 4,
        },
        {
            name: 'Artifact',
            stack: 1,
        },
        {
            name: 'Gemstones',
            stack: 10,
        },
        ...DEFAULT_RULES.equipment,
    ],
    containers: [
        {
            name: "Personal",
            size: 5,
        },
        {
            name: "Pack",
            size: 5,
        }
    ],
    powers: [
        {
            name: 'Pyromancy'
        },
        {
            name: 'Cryomancy'
        },
        {
            name: 'Occult'
        },
        {
            name: 'Divine'
        },
        {
            name: 'Rage'
        }
    ],
    currency: [
        {
            name: "Gold",
            precision: 0,
        }
    ],
}

export default bludgeonRuleset;