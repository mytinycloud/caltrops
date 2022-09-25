
export interface Aspect {
    name: string,
    description: string
}

export interface Attribute {
    name: string,
    description: string,
    aspects: Aspect[],
}

export interface Skill {
    name: string,
    description: string,
}

export interface Equipment {
    name: string,
    stack: number,
    description: string,
}

export interface CarrySlot {
    name: string,
    description: string,
}

export interface Power {
    name: string,
    description: string,
    source: string, // name of skill to use as level source
    dice: {
        base: number, // dice at lvl 1
        level: number, // dice per level.
    }
}

export interface Rules {
    name: string,
    theme: string,
    skills: Skill[],
    attributes: Attribute[],
    equipment: Equipment[],
    carrySlots: CarrySlot[],
    powers: Power[],
}

export interface Sheet {
    rules: string,
    info: {
        name: string,
        level: number,
        background: string,
        funds: string,
    },
    equipment: any,
    skills: {[key: string]: number},
    attributes: {[key: string]: number},
    powers: {[key: string]: number},
}

export const DEFAULT_RULES: Rules = {
    name: 'default',
    theme: 'light',
    skills: [
        {
            name: 'Default skill',
            description: "Skills should be overidden by the ruleset",
        },
    ],
    equipment: [
        {
            name: 'Default item',
            stack: 1,
            description: "Equipment should be overidden by the ruleset",
        },
    ],
    carrySlots: [
        {
            name: 'Default slot',
            description: 'Carry slots should be overridden by the ruleset',
        },
    ],
    powers: [
        {
            name: 'Default power',
            description: 'Powers should be overidden by the ruleset',
            source: 'Default skill',
            dice: {
                base: 3,
                level: 1,
            }
        }
    ],
    attributes: [
        {
            name: 'Strength',
            description: '',
            aspects: [
                {
                    name: 'Violence',
                    description: ''
                },
                {
                    name: 'Control',
                    description: ''
                },
            ]
        },
        {
            name: 'Dexterity',
            description: '',
            aspects: [
                {
                    name: 'Reflex',
                    description: ''
                },
                {
                    name: 'Precision',
                    description: ''
                },
            ]
        },
        {
            name: 'Intellect',
            description: '',
            aspects: [
                {
                    name: 'Wit',
                    description: ''
                },
                {
                    name: 'Knowledge',
                    description: ''
                },
            ]
        },
        {
            name: 'Will',
            description: '',
            aspects: [
                {
                    name: 'Presence',
                    description: ''
                },
                {
                    name: 'Focus',
                    description: ''
                },
            ]
        },
    ]
}

