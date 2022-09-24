import { DEFAULT_RULES, Rules } from '../lib/rules'

const airlockRuleset: Rules = {
    ...DEFAULT_RULES,

    name: 'Airlocks',
    theme: 'atompunkmoderna',
    skills: [
        {
            name: 'Observation',
            description: "The capacity to observe the details of one's surroundings",
        },
        {
            name: 'Gunnary',
            description: '',
        },
        {
            name: 'Bludgeoning',
            description: '',
        },
        {
            name: 'Explosives',
            description: '',
        },
        {
            name: 'Piloting',
            description: '',
        },
        {
            name: 'Sneak',
            description: '',
        },
        {
            name: 'Deception',
            description: '',
        },
        {
            name: 'Eloquence',
            description: '',
        },
        {
            name: 'Athletics',
            description: '',
        },
        {
            name: 'History',
            description: '',
        },
        {
            name: 'Medicine',
            description: '',
        },
        {
            name: 'Science',
            description: '',
        },
        {
            name: 'Engineering',
            description: '',
        },
        {
            name: 'Computing',
            description: '',
        },
        {
            name: 'Survival',
            description: '',
        },
    ],
    equipment: [
        {
            name: 'Pistol',
            stack: 1,
            description: 'A common sidearm. Fires standard 9mm rounds.',
        },
        {
            name: 'Pisol ammunition',
            stack: 3,
            description: 'Clips of ammunition for a regular pistol.',
        },
    ],
    carrySlots: [
        {
            name: 'Shoulder',
            description: '',
        },
        {
            name: 'Vest #1',
            description: '',
        },
        {
            name: 'Vest #2',
            description: '',
        },
        {
            name: 'Belt #1',
            description: '',
        },
        {
            name: 'Belt #2',
            description: '',
        },
    ]
}

export default airlockRuleset;