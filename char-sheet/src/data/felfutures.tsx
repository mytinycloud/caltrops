import { DEFAULT_RULES, Rules } from '../lib/rules'

const felfuturesRuleset: Rules = {
    ...DEFAULT_RULES,

    name: 'Fel Futures',
    theme: 'darkest',
    skills: [
        {
            name: 'Athletics',
        },
        {
            name: 'Mechanical',
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
            name: 'Melee',
        },
        {
            name: 'Observation',
        },
        {
            name: 'Stealth',
        },
        {
            name: 'Heavy weapons',
        },
        {
            name: 'Warp Touched',
            trained: true,
        },
        {
            name: 'Stimmed',
            trained: true,
        },
        {
            name: 'Possessed',
            trained: true,
        },
        {
            name: 'Chosen',
            trained: true,
        },
       {
            name: 'Undivided',
            trained: true,
        },

    ],
    equipment: [
        {
            name: 'Combat Slot 1',
            custom: true,
        },
        {
            name: 'Combat Slot 2',
            custom: true,
        },
        {
            name: 'Combat Slot 3',
            custom: true,
        },
        {
            name: 'Combat Slot 4',
            custom: true,
        },
        {
            name: 'Light Ammo',
        },
        {
            name: 'Heavy Ammo',
        },
        {
            name: 'Special Ammo',
        },
        {
            name: 'Frag Grenade',
            stack: 3,
        },
        {
            name: 'Krak Grenade',
            stack: 3,
        },
        {
            name: 'Plasma Grenade',
            stack: 3,
        },
        {
            name: 'Special Grenade',
            stack: 3,
        },
        {
            name: 'Melta Bomb',
            stack: 2,
        },
        {
            name: 'Warp Tainted',
            tag: 'armour',
        },
        {
            name: 'Terminator',
            tag: 'armour',
        },
        {
            name: 'Assault Pack',
            tag: 'armour',
        },
        {
            name: 'Stealth',
            tag: 'armour',
        },
        {
            name: 'Dark Mechanicum',
            tag: 'armour',
        },
   
        ...DEFAULT_RULES.equipment,
    ],


    containers: [
        {
            name: "Personal",
            size: 7,
            tags: [ '.' ],
        },
        {
            name: "Armor",
            size: 1,
            tags: [ "armour" ]
        },
    ],
    powers: [
        {
            name: 'Warp Touched'
        },
        {
            name: 'Stimmed'
        },
        {
            name: 'Possessed'
        },
        {
            name: 'Chosen'
        },
        {
            name: 'Undivided'
        }
    ],
    currency: [
    ],
}

export default felfuturesRuleset;