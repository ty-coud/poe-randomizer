import "./styles.scss"

const { classes } = require('./data/classes.json')
let { skills } = require('./data/skills.json')

skills = skills.filter((skill, index, array) => array.indexOf(skill) === index)

window.onload = function() {
    const characterSelect = document.querySelector('select#filter-class')
    const ascendancySelect = document.querySelector('select#filter-ascendancy')

    characterSelect.addEventListener('change', (e) => {
        const selected = e.target.options[e.target.selectedIndex].value

        updateAscendancyFilter(selected, ascendancySelect)
    })

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

const updateAscendancyFilter = (selected, ascendancySelect) => {
    while (ascendancySelect.firstChild) {
        ascendancySelect.removeChild(ascendancySelect.firstChild)
    }

    let options = [], newOption

    switch (selected) {
        case 'filter-class-marauder':
            newOption = document.createElement('option')
            newOption.setAttribute('value', '')
            newOption.innerText = '------'
            options.push(newOption)

            newOption = document.createElement('option')
            newOption.setAttribute('value', 'filter-ascendancy-juggernaut')
            newOption.innerText = 'Juggernaut'
            options.push(newOption)

            newOption = document.createElement('option')
            newOption.setAttribute('value', 'filter-ascendancy-berserker')
            newOption.innerText = 'Berserker'
            options.push(newOption)

            newOption = document.createElement('option')
            newOption.setAttribute('value', 'filter-ascendancy-chieftain')
            newOption.innerText = 'Chieftain'
            options.push(newOption)

            ascendancySelect.disabled = false
            break;
        case 'filter-class-ranger':
            newOption = document.createElement('option')
            newOption.setAttribute('value', '')
            newOption.innerText = '------'
            options.push(newOption)

            newOption = document.createElement('option')
            newOption.setAttribute('value', 'filter-ascendancy-deadeye')
            newOption.innerText = 'Deadeye'
            options.push(newOption)

            newOption = document.createElement('option')
            newOption.setAttribute('value', 'filter-ascendancy-pathfinder')
            newOption.innerText = 'Pathfinder'
            options.push(newOption)

            newOption = document.createElement('option')
            newOption.setAttribute('value', 'filter-ascendancy-raider')
            newOption.innerText = 'Raider'
            options.push(newOption)

            ascendancySelect.disabled = false
            break;
        case 'filter-class-witch':
            newOption = document.createElement('option')
            newOption.setAttribute('value', '')
            newOption.innerText = '------'
            options.push(newOption)

            newOption = document.createElement('option')
            newOption.setAttribute('value', 'filter-ascendancy-necromancer')
            newOption.innerText = 'Necromancer'
            options.push(newOption)

            newOption = document.createElement('option')
            newOption.setAttribute('value', 'filter-ascendancy-elementalist')
            newOption.innerText = 'Elementalist'
            options.push(newOption)

            newOption = document.createElement('option')
            newOption.setAttribute('value', 'filter-ascendancy-occultist')
            newOption.innerText = 'Occultist'
            options.push(newOption)

            ascendancySelect.disabled = false
            break;
        case 'filter-class-duelist':
            newOption = document.createElement('option')
            newOption.setAttribute('value', '')
            newOption.innerText = '------'
            options.push(newOption)

            newOption = document.createElement('option')
            newOption.setAttribute('value', 'filter-ascendancy-slayer')
            newOption.innerText = 'Slayer'
            options.push(newOption)

            newOption = document.createElement('option')
            newOption.setAttribute('value', 'filter-ascendancy-gladiator')
            newOption.innerText = 'Gladiator'
            options.push(newOption)

            newOption = document.createElement('option')
            newOption.setAttribute('value', 'filter-ascendancy-champion')
            newOption.innerText = 'Champion'
            options.push(newOption)

            ascendancySelect.disabled = false
            break;
        case 'filter-class-templar':
            newOption = document.createElement('option')
            newOption.setAttribute('value', '')
            newOption.innerText = '------'
            options.push(newOption)

            newOption = document.createElement('option')
            newOption.setAttribute('value', 'filter-ascendancy-guardian')
            newOption.innerText = 'Guardian'
            options.push(newOption)

            newOption = document.createElement('option')
            newOption.setAttribute('value', 'filter-ascendancy-hierophant')
            newOption.innerText = 'Hierophant'
            options.push(newOption)

            newOption = document.createElement('option')
            newOption.setAttribute('value', 'filter-ascendancy-inquisitor')
            newOption.innerText = 'Inquisitor'
            options.push(newOption)

            ascendancySelect.disabled = false
            break;
        case 'filter-class-shadow':
            newOption = document.createElement('option')
            newOption.setAttribute('value', '')
            newOption.innerText = '------'
            options.push(newOption)

            newOption = document.createElement('option')
            newOption.setAttribute('value', 'filter-ascendancy-assassin')
            newOption.innerText = 'Assassin'
            options.push(newOption)

            newOption = document.createElement('option')
            newOption.setAttribute('value', 'filter-ascendancy-saboteur')
            newOption.innerText = 'Saboteur'
            options.push(newOption)

            newOption = document.createElement('option')
            newOption.setAttribute('value', 'filter-ascendancy-trickster')
            newOption.innerText = 'Trickster'
            options.push(newOption)

            ascendancySelect.disabled = false
            break;
        case 'filter-class-scion':
            newOption = document.createElement('option')
            newOption.setAttribute('value', '')
            newOption.innerText = '------'
            options.push(newOption)

            newOption = document.createElement('option')
            newOption.setAttribute('value', 'filter-ascendancy-ascendant')
            newOption.innerText = 'Ascendant'
            options.push(newOption)

            ascendancySelect.disabled = false
            break;
        default:
            newOption = document.createElement('option')
            newOption.setAttribute('value', '')
            newOption.innerText = '------'
            options.push(newOption)

            ascendancySelect.disabled = true
            break;
    }

    options.forEach(option => {
        ascendancySelect.appendChild(option)
    })
}