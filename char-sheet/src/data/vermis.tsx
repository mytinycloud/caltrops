import { DEFAULT_RULES, Rules } from '../lib/rules'

const vermisRuleset: Rules = {
    ...DEFAULT_RULES,

    name: 'VERMIS',
    theme: 'darkest',
    woundSizeLimit: 3,
    useAspects: false,
    attributes: [
        {
            name: 'Strength',
            aspects: []
        },
        {
            name: 'Intelligence',
            aspects: []
        },
        {
            name: 'Faith',
            aspects: []
        },
        {
            name: 'Will',
            aspects: []
        }
    ],
    skills: [
        {
            name: 'Hack',
        },
        {
            name: 'Throw',
        },
        {
            name: 'Shoot',
        },
        {
            name: 'Seek',
        },
        {
            name: 'Lurk',
        },
        {
            name: 'Discern',
        },
        {
            name: 'Evade',
        },
        {
            name: 'Resist',
        },
        {
            name: 'Taunt',
        },
        {
            name: 'Tend',
        },
        {
            name: 'Pray',
            trained: true,
        },
        {
            name: 'Cast',
            trained: true,
        },
    ],
    equipment: [
        {
            name: "Stone staff",
            description: "Staff made of tiny merged rocks, used to help scholars walk and cast spells"
        },
        {
            name: "Stone bone",
            description: "Shaped like a vertebra, this stone is inserted inside their backs as a sign of devotion."
        },
        {
            name: "Beloved necklace",
            description: "Shiny necklace with the portrait of a young boy inside. Probably stolen."
        },
        {
            name: "Bone dagger",
            description: "A dagger carved out of a long bone."
        },
        {
            name: "Sage diciple",
            description: "Crosier that can also be used as a mace. Depicts the visage of a Murk Sage."
        },
        {
            name: "Moon murder",
            description: "Talisman for vanishing the moon for a night. When crushed, that same night will be pitch dark."
        },
        {
            name: "Mum doll",
            description: "Small doll made of grey hair."
        },
        {
            name: "Wicker basket",
            description: "Used to carry the ingredients she gather for her meals.",
            stack: 3,
        },
        {
            name: "Broken badge",
            description: "A symbol of pride and a reminder of the past."
        },
        {
            name: "Witch tongue",
            description: "Once separated from the witch, it can determine a nearby evil presence by vibrating."
        },
        {
            name: "Ghylak statuette",
            description: "Ghylak is often represented as a coiled snake with a womans head.",
        },
        {
            name: "Snake fang",
            description: "The angels pierce themselves with the fang to release a poison the makes them go beserk.",
            stack: 3,
        },
        {
            name: "Devotion symbol",
            description: "A long sword handle with a lock of hair tied tightly."
        },
        {
            name: "Bone fermenter",
            description: "A potion that makes ones bones extremely fragile.",
            stack: 3,
        },
        {
            name: "Pricklehelm",
            description: "Rumor has it that their helmets are full of spikes on the inside.",
            stack: 2,
        },
        {
            name: "Iron handcuffs",
            description: "Covered with spikes, effective for melee combat and for protection against sharp weapons."
        },
        {
            name: "Scented oil",
            description: "Fuel for the miners lamp, slightly alleviates the smell of death.",
            stack: 3,
        },
        {
            name: "Glowing spores",
            description: "Used in the mines to mark forbidden paths.",
            stack: 3,
        },
        {
            name: "Beast eye",
            description: "Capable of ferociously tracking any prey in the dark."
        },
        {
            name: "Beast tongue",
            description: "Infected with numerous bacteria, a single bite can cause serious poisoning."
        },
        {
            name: "Strength gauntlets",
            description: "Enchanted gauntlets capable of greatly raising the owners strength."
        },
        {
            name: "The whisper",
            description: "Legends are told about the whispering stone, only the people who desparately seek the unachievable can hear it."
        },
        {
            name: "Marko effigy",
            description: "Since Marko's head was defiled, the effigy is one of the few remaining images of the God."
        },
        {
            name: "Incense bag",
            description: "Contains incense used in prayers and purifying rituals.",
            stack: 3,
        },
        {
            name: "Whistling death",
            description: "A long thin sword with a skull pommel. It makes a very distinct sound when it cuts through the air."
        },
        {
            name: "Merciless warrior helmet",
            stack: 1,
        },
        {
            name: "Severed finger",
        },
        {
            name: "Lonely knights mace",
        },
        {
            name: "Stone skull",
            description: "A half skull made of stone. (the top half)."
        },
        {
            name: "Bone crusher",
            description: "An axe made entirely out of bone. It appears to have grown naturally into this shape."
        },
        {
            name: "Ring of the Thousand Eyes",
        },
        {
            name: "Exiled sentinel armor",
            stack: 2,
            description: "The armor is very heavy and full of ornaments, all painted in green with bronze details."
        },
        {
            name: "Night watch mushroom",
            stack: 4,
            description: "Commonly used by night watch guards to stay awake."
        },
        {
            name: "Memory of the Stinger",
            description: "Silver rapier, once held by the Aspect of the dream."
        },
        {
            name: "Ring of the Singing Fire",
        },
        {
            name: "Rusted blade",
        },
        {
            name: "Rusted shield",
            stack: 1,
        },
        {
            name: "Rusted flail",
        },
        {
            name: "Rusted armor",
            stack: 1,
        },
        {
            name: "Miners lantern",
        },
        {
            name: "Brittle bone",
            stack: 3,
        },
        {
            name: "Red vial",
            description: "The red fluid within tastes metallic, but is said to restore ones strength.",
            stack: 3,
        },
        {
            name: "Bitter herb",
            description: "These herbs are poisonous unless prepared correctly.",
            stack: 3,
        },
        {
            name: "Morsel",
            stack: 3,
        },
        {
            name: "Pitch torch",
            description: "Burns to release black smoke acompanied by meager light.",
            stack: 3,
        },
        {
            name: "Tattered cloth",
            stack: 3,
        },
        ...DEFAULT_RULES.equipment,
    ],
    containers: [
        {
            name: "Personal",
            size: 5,
        },
    ],
    powers: [
        {
            name: 'Pray'
        },
        {
            name: 'Cast'
        },
    ],
    currency: [
        {
            name: "Gold",
            precision: 0,
        }
    ],
}

export default vermisRuleset;