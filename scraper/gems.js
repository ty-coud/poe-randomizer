const fs = require('fs')

const fetch = require('node-fetch')
const cheerio = require('cheerio')

const skillData = {
    "skills": [],
    "tags": []
}

const ignoredTags = ['Aura', 'Warcry', 'Duration', 'Channelling', 'Trigger', 'Chaining', 'Movement', 'Nova', 'Golem', 'Critical', 'Prismatic', 'Orb', 'Arcane', 'AoE', 'Melee', 'Projectile']
const ignoredGems = ['Flesh Offering', 'Bone Offering', 'Spirit Offering', 'Portal', 'Detonate Mines', 'Brand Recall', 'Berserk', 'Blood Rage', 'Corrupting Fever', 'Arctic Armour', 'Tempest Shield', 'Temporal Rift', 'Convocation', 'Wither']

const scrapeGems = async () => {
    const data = await fetch('https://poedb.tw/us/Gem')
    const html = await data.text()

    const $ = cheerio.load(html)

    await getGems($)

    skillData.tags = skillData.tags.filter(tag => !ignoredTags.includes(tag))

    console.log(skillData.tags)

    fs.writeFileSync('../src/data/skills.json', JSON.stringify(skillData))
}

const getGems = ($) => {
    return new Promise(async (resolve, reject) => {
        const gems = $('tbody tr')

        for (let i = 0; i < gems.length; i++) {
            const gem = gems[i];
            
            let stat, link
            if ($(gem).find('a.gem_red')[0] !== undefined) {
                stat = 'Str'
                link = `https://poedb.tw${$(gem).find('a.gem_red')[0].attribs.href}`
            } else if ($(gem).find('a.gem_green')[0] !== undefined) {
                stat = 'Dex'
                link = `https://poedb.tw${$(gem).find('a.gem_green')[0].attribs.href}`
            } else if ($(gem).find('a.gem_blue')[0] !== undefined) {
                stat = 'Int'
                link = `https://poedb.tw${$(gem).find('a.gem_blue')[0].attribs.href}`
            }

            const name = $(gem).text().split('(')[0].trim()

            const tags = $(gem).text().split(')')[1].trim().split(',')
            for (let i = 0; i < tags.length; i++) { tags[i] = tags[i].trim() }

            const img = $(gem).find('img')[0].attribs.src

            let identity

            if (tags.includes('Minion')) {
                identity = 'Minion'
            } else if (tags.includes('Totem')) {
                identity = 'Totem'
            } else if (tags.includes('Mine')) {
                identity = 'Mine'
            } else if (tags.includes('Trap')) {
                identity = 'Trap'
            } else if (tags.includes('Brand')) {
                identity = 'Brand'
            } else if (name === 'Hexblast' || name === 'Bane') {
                identity = 'Hex'
            } else {
                identity = 'Generic'
            }

            if (!tags.includes('Support') && !tags.includes('Vaal') && !tags.includes('Curse') && !tags.includes('Travel') && !tags.includes('Link') && !tags.includes('Herald') && !tags.includes('Guard') && !tags.includes('Stance')) {
                if (!tags.includes('Warcry')) {
                    if (!tags.includes('Aura')) {
                        if (!tags.includes('Trigger')) {
                            if (!ignoredGems.includes(name)) {
                                skillData.skills.push({ name, tags, img, stat, identity, link })

                                for (let i = 0; i < tags.length; i++) { if (!skillData.tags.includes(tags[i])) { skillData.tags.push(tags[i]) } }
                            }
                        } else if (name === 'Bane' || name === 'Arcanist Brand') {
                            skillData.skills.push({ name, tags, img, stat, identity, link })

                            for (let i = 0; i < tags.length; i++) { if (!skillData.tags.includes(tags[i])) { skillData.tags.push(tags[i]) } }
                        }
                    } else if (name === 'Smite' || name === 'Stormblast Mine' || name === 'Icicle Mine' || name === 'Pyroclast Mine') {
                        skillData.skills.push({ name, tags, img, stat, identity, link })

                        for (let i = 0; i < tags.length; i++) { if (!skillData.tags.includes(tags[i])) { skillData.tags.push(tags[i]) } }
                    }
                } else if (name === "General's Cry") {
                    skillData.skills.push({ name, tags, img, stat, identity, link })

                    for (let i = 0; i < tags.length; i++) { if (!skillData.tags.includes(tags[i])) { skillData.tags.push(tags[i]) } }
                }
            } else if (name === 'Earthbreaker Support' || name === 'Trap Support' || name === 'Blastchain Mine Support' || name === 'High-Impact Mine Support' || name === 'Spell Totem Support' || name === 'Ballista Totem Support' || name === 'Arcanist Brand') {
                skillData.skills.push({ name, tags, img, stat, identity, link })

                for (let i = 0; i < tags.length; i++) { if (!skillData.tags.includes(tags[i])) { skillData.tags.push(tags[i]) } }
            }
        }

        console.log(`Writing ${skillData.skills.length} Gems`)
        resolve()
    })
}

scrapeGems()