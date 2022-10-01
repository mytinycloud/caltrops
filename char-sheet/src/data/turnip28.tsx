import { DEFAULT_RULES, Rules } from '../lib/rules'

const turnipRuleset: Rules = {
    ...DEFAULT_RULES,

    name: 'Turnip28',
    theme: 'retro',
    skills: [
        {
            name: 'Observation',
        },
        {
            name: 'Snuff',
        },
        {
            name: 'Beastie Handling',
        },
        {
            name: 'Lies',
        },
        {
            name: 'Truth',
        },
        {
            name: 'Fancy Talk',
        },
        {
            name: 'Uncooth Talk',
        },
        {
            name: 'Stitching',
        },
        {
            name: 'Athletics',
        },
        {
            name: 'Crude Firearms',
        },
        {
            name: 'Refined Firearms',
        },
        {
            name: 'Simple Melee',
        },
        {
            name: 'Martial Melee',
        },
        {
            name: 'Engineering',
        },
        {
            name: 'Sapping',
        },
    ],
    equipment: [
        {
            name: 'Musket',
        },
        {
            name: 'Rifle',
        },
        {
            name: 'Pistol',
        },
        {
            name: 'Rifled Pistol',
        },
        {
            name: 'Blundershovel',
        },
        {
            name: 'Zweihander',
        },
        {
            name: 'Saber',
        },
        {
            name: 'Bayonet',
        },
        {
            name: 'Trench Club',
        },
        {
            name: 'Officers Curass',
        },
        {
            name: 'Trenchers Plate',
        },
        {
            name: 'Trenchers Half Plate',
        },
        {
            name: 'Trattered Uniform',
        },
        {
            name: 'Snuff Box',
        },
        {
            name: 'Fancy Hat',
        },
        {
            name: 'Extra Fancy Hat',
        },
        {
            name: 'Aromatics',
            stack: 8,
        },
        {
            name: 'Black Powder Charge',
        },
        {
            name: 'Ball',
            stack: 32,
        },
        {
            name: 'Bullet',
            stack: 32,
        },
        {
            name: 'Hay',
            stack: 3,
        },
        {
            name: 'Worms',
            stack: 3,
        },
        {
            name: 'Sawdust',
            stack: 3,
        },
        {
            name: 'Medals',
            stack: 8,
        },
    ],
    powers: [
        {
            name: 'Snuff',
            source: 'Snuff',
            dice: {
                base: 3,
                level: 1,
            }
        }
    ]
}

export default turnipRuleset;