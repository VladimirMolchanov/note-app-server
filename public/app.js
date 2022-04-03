document.addEventListener('click', event => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id

        remove(id).then(() => {
            event.target.closest('li').remove()
        })
    }

    if (event.target.dataset.type === 'update') {
        const id = event.target.dataset.id
        const newTitle = window.prompt()

        if (newTitle !== null && newTitle !== '') {
            update(id, newTitle).then(() => {
                const node = event.target.closest('li').querySelector('span')
                node.innerText = newTitle
            })
        }
    }
})


async function remove(id) {
    await fetch(`/${id}`, {
        method: 'DELETE'
    })
}

async function update(id, title) {
    await fetch(`/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title
        })
    })
}
