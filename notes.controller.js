const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
    const notes = await getNotes()
    const note = {
        title,
        id: Date.now().toString()
    }

    notes.push(note)

    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.bgGreen('Note was added!'))
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, {
        encoding: 'utf-8'
    })
    if(notes === '') return []
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes() {
    const notes = await getNotes()

    if (notes.length !== 0) {
        console.log(chalk.bgBlue('Here is the list of notes:'))
        notes.forEach(note => {
            console.log(`${chalk.cyan(note.id)} ${chalk.blue(note.title)}`)
        })
    } else {
        console.log(chalk.bgBlue('Empty notes list'))
    }

}

async function removeNote(id) {
    const notes = await getNotes()
    const index = notes.findIndex(note => note.id === id)
    if (index === -1) {
        console.log(chalk.red('Not find id notes'))
    } else {
        await fs.writeFile(notesPath, JSON.stringify(notes.filter(note => note.id !== id)))
        console.log(chalk.bgGreen('Note was remove!'))
    }
}

module.exports = {
    addNote, printNotes, removeNote, getNotes
}
