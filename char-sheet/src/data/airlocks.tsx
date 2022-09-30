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
        {
            name: 'Abyss',
            description: '',
        }
    ],
    equipment: [
        {
            name: 'Pistol',
            stack: 1,
            description: 'A common sidearm. Easily concealed and quickly drawn. Consumes a clip per encounter.',
        },
        {
            name: 'Rifle',
            stack: 1,
            description: 'An assault rifle. For precision shooting at moderate range. Consumes a clip per encounter.',
        },
        {
            name: 'Submachine gun',
            stack: 1,
            description: 'A short weapon, intended to send a withering quantity of lead downrange. Consumes a clip per encounter. May consume an clip per round to lay down supressing fire.',
        },
        {
            name: 'Ammunition',
            stack: 4,
            description: 'Clips of ammunition for standardised conventional weapons.',
        },
        {
            name: 'Bandages',
            stack: 3,
            description: 'Composite sheets of elastic, padding, and gauze. Suitable for protecting open wounds.',
        },
        {
            name: 'Medicines',
            stack: 4,
            description: 'A pouch of assorted antibiotics, opioids, steriods, and other generic problem solvers.',
        },
        {
            name: 'Rations',
            stack: 4,
            description: 'A single celled protien combined with syntheic amnios, vitamins and minerals. Everything the body needs.',
        },
        {
            name: 'Crowbar',
            stack: 1,
            description: 'A long piece of metal with a hookey thing at the end.',
        },
        {
            name: 'Wrench',
            stack: 1,
            description: 'A large adjustable wrench perfect for general shipboard maintenence.',
        },
        {
            name: 'Machete',
            stack: 1,
            description: 'A broad cutting implement - as effective for intimidation as it is for agriculture.',
        },
        {
            name: 'Flares',
            stack: 3,
            description: 'Chemical exploration flares. These burn without oxygen, and are perfect for illuminating large areas, starting fires, and overwhelming infra-red targeting arrays.',
        },
        {
            name: 'Torch',
            stack: 1,
            description: 'A handheld torch for lighting your way. Consumes a battery after a days operation.',
        },
        {
            name: 'Batteries',
            stack: 6,
            description: 'Lithium graphene polymer batteries in a standardised form-factor. Do not over-charge. Do not over-discharge. Do not burn. Do not immerse in water. Do not consume.',
        },
        {
            name: 'Hand computer',
            stack: 1,
            description: 'A compact tablet computer. Useful for data entry or interfacing with other computers. Comes with a range of standard industrial connectors.',
        },
        {
            name: 'Tether',
            stack: 1,
            description: 'A 30m industrial cable complete with eyelets and hooks. Its rated capacity is 5 Ton. (1 Ton in impact conditions).',
        },
        {
            name: 'Rebreather',
            stack: 1,
            description: 'A mask with an air filtration and oxygen enrichment unit. Can enable a days worth of operation in hostile atmospheres.',
        },
        {
            name: 'Explosves',
            stack: 3,
            description: 'Sticks of plastic explosive with remotely triggered detonation caps. Until the detonation caps are armed, the compound is extremely inert.',
        },
        {
            name: 'Chaff grenade',
            stack: 3,
            description: 'This grenade explodes into a shower of bright magnesium fire and aliumium foil strips. This defeats a wide range of optical and electromagnetic sensors.',
        },
        {
            name: 'Laser',
            stack: 1,
            description: 'A man portable laser - its blinding orange beam is capable of cutting through doors as easily as humans. Consumes one battery per round.',
        },
        {
            name: 'Flame thrower',
            stack: 1,
            description: 'This can project a jet of burning liquid fuel some 15 meters. With the addition of plasticiser sachets, any traditional heavy fuel can be used. Consumes one fuel canister per encounter.',
        },
        {
            name: 'Flame canister',
            stack: 3,
            description: 'A small cylinder of liquid fuel. Used exclusively for burning things.',
        },
        {
            name: 'Spiderbot',
            stack: 1,
            description: 'A hexapod robot with 30cm legspan. This can be remotely controlled to explore confined spaces, carry small tools, and even enact minor repairs.',
        },
        {
            name: 'Plutonium rod',
            stack: 1,
            description: 'An plutonium fuel rod for reactor for compact nuclear reactors.',
        },
    ],
    powers: [
        {
            name: 'Abyss',
            description: '',
            source: 'Abyss',
            dice: {
                base: 3,
                level: 1,
            }
        }
    ]
}

export default airlockRuleset;