
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

export interface Rules {
    name: string,
    theme: string,
    skills: Skill[],
    attributes: Attribute[],
    equipment: Equipment[],
    carrySlots: CarrySlot[],
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
            description: 'Carry clots should be overridden by the ruleset',
        },
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

