import "./styles.scss"

const { classes } = require('./data/classes.json')
let { skills } = require('./data/skills.json')

skills = skills.filter((skill, index, array) => array.indexOf(skill) === index)

window.onload = function() {
    const button = document.querySelector('button#btn-randomize')
    button.addEventListener('click', (e) => {
        e.preventDefault()

        const data = {
            skill: getRandomSkill()
        }

        data.character = getRandomClass(data.skill, false)

        displayResult(data)
    })
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
}

const getRandomSkill = () => {
    let result = skills[getRandomInt(skills.length)]

    console.log(result)

    if (result.name === 'Arcanist Brand') {
        let eligibileSkills = skills.filter(skill => skill.tags.includes('Spell'))

        result.trigger = eligibileSkills[getRandomInt(eligibileSkills.length)]

        console.log(result.trigger)
    } else if (result.name === 'Earthbreaker Support') {
        let eligibileSkills = skills.filter(skill => skill.tags.includes('Slam'))

        result.trigger = eligibileSkills[getRandomInt(eligibileSkills.length)]

        console.log(result.trigger)
    } else if (result.name === 'Trap Support') {
        let eligibileSkills = skills.filter(skill => skill.tags.includes('Spell'))

        result.trigger = eligibileSkills[getRandomInt(eligibileSkills.length)]

        console.log(result.trigger)
    } else if (result.name === 'Blastchain Mine Support') {
        let eligibileSkills = skills.filter(skill => skill.tags.includes('Spell'))

        result.trigger = eligibileSkills[getRandomInt(eligibileSkills.length)]

        console.log(result.trigger)
    } else if (result.name === 'High-Impact Mine Support') {
        let eligibileSkills = skills.filter(skill => skill.tags.includes('Spell'))

        result.trigger = eligibileSkills[getRandomInt(eligibileSkills.length)]

        console.log(result.trigger)
    } else if (result.name === 'Spell Totem Support') {
        let eligibileSkills = skills.filter(skill => skill.tags.includes('Spell'))

        result.trigger = eligibileSkills[getRandomInt(eligibileSkills.length)]

        console.log(result.trigger)
    } else if (result.name === 'Ballista Totem Support') {
        let eligibileSkills = skills.filter(skill => skill.tags.includes('Bow'))

        result.trigger = eligibileSkills[getRandomInt(eligibileSkills.length)]

        console.log(result.trigger)
    }

    return (result)
}

const getRandomClass = (skill, confirmed) => {
    let eligibleClasses = classes.filter(thisClass => thisClass.stats.includes(skill.stat))
    let result = eligibleClasses[getRandomInt(eligibleClasses.length)]

    console.log(result)

    if (result.name === 'Scion' && !confirmed) {
        return getRandomClass(skill, true)
    }

    let eligibleAscendancies = result.ascendancies.filter(thisAscendancy => thisAscendancy.identity.includes(skill.identity))
    result.ascendancy = eligibleAscendancies[getRandomInt(eligibleAscendancies.length)]

    console.log(result.ascendancy)

    if (!result.ascendancy) {
        return getRandomClass(skill, confirmed)
    }

    return result
}

const displayResult = (data) => {
    const { character, skill } = data

    const section = document.querySelector('section#results')

    const resultsClass = document.querySelector('h2.results-class')
    resultsClass.innerText = `${character.name} - ${character.ascendancy.name}`

    const resultsClassImg = document.querySelector('img.results-class-img')
    resultsClassImg.alt = character.ascendancy.name
    resultsClassImg.src = character.ascendancy.img

    const resultsGem = document.querySelector('h2.results-gem')
    resultsGem.innerText = skill.name

    const resultsGemLink = document.querySelector('a.results-gem-link')
    resultsGemLink.href = skill.link

    const resultsGemImg = document.querySelector('img.results-gem-img')
    resultsGemImg.alt = skill.name
    resultsGemImg.src = skill.img

    if (skill.trigger) {
        resultsGem.innerText += ` - ${skill.trigger.name}`

        const resultsGemImgTrigger = document.querySelector('img.results-gem-img-trigger')
        resultsGemImgTrigger.alt = skill.trigger.name
        resultsGemImgTrigger.src = skill.trigger.img

        const resultsGemLinkTrigger = document.querySelector('a.results-gem-link-trigger')
        resultsGemLinkTrigger.href = skill.link
    } else {
        const resultsGemImgTrigger = document.querySelector('img.results-gem-img-trigger')
        resultsGemImgTrigger.alt = ''
        resultsGemImgTrigger.src = ''

        const resultsGemLinkTrigger = document.querySelector('a.results-gem-link-trigger')
        resultsGemLinkTrigger.href = ''
    }

    section.style.display = 'block'
}