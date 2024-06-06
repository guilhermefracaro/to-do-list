const taskInput = document.querySelector('#task')
const taskButton = document.querySelector('#btn')
const taskList = document.querySelector('.list')

const saveTasks = () => {
    const tasks = []
    document.querySelectorAll('.list li').forEach(item => {
        tasks.push({
            text: item.querySelector('span').textContent,
            completed: item.querySelector('span').classList.contains('completed')
        })
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks'))
    if (tasks) {
        tasks.forEach(task => {
            addTaskToList(task.text, task.completed)
        })
    }
}

const addTaskToList = (taskText, completed = false) => {
    const itemList = document.createElement('li')

    const taskSpan = document.createElement('span')
    taskSpan.textContent = taskText

    if (completed) {
        taskSpan.classList.add('completed')
    }

    taskSpan.addEventListener('click', () => {
        taskSpan.classList.toggle('completed')
        saveTasks()
    })

    const removeButton = document.createElement('button')
    removeButton.textContent = 'Remover tarefa'
    removeButton.classList.add('remove')

    removeButton.addEventListener('click', () => {
        itemList.remove()
        saveTasks()
    })

    itemList.appendChild(taskSpan)
    itemList.appendChild(removeButton)

    taskList.appendChild(itemList)
}

taskButton.addEventListener('click', () => {
    const taskText = taskInput.value

    if (taskText !== '') {
        addTaskToList(taskText)
        taskInput.value = ''
        saveTasks()
    } else {
        alert('Por favor, digite algo...')
    }
})

document.addEventListener('DOMContentLoaded', loadTasks)