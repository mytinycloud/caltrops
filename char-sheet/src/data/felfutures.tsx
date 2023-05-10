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
        },
        {
            name: 'Combat Slot 2',
        },
        {
            name: 'Combat Slot 3',
        },
        {
            name: 'Combat Slot 4',
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
            size: 5,
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
            name: 'Warp Touched',
            source: 'Warp Touched',
            dice: {
                base: 2,
                level: 2,
            }
        },
        {
            name: 'Stimmed',
            source: 'Stimmed',
            dice: {
                base: 2,
                level: 2,
            }
        },
        {
            name: 'Possessed',
            source: 'Possessed',
            dice: {
                base: 2,
                level: 2,
            }
        },
        {
            name: 'Chosen',
            source: 'Chosen',
            dice: {
                base: 2,
                level: 2,
            }
        },
        {
            name: 'Undivided',
            source: 'Undivided',
            dice: {
                base: 2,
                level: 2,
            }
        }
    ],
    currency: [
    ],
}

export default felfuturesRuleset;