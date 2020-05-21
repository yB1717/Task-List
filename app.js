//DEFINE UI VARS
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

//LOAD ALL EVENT LISTENERS
loadEventListeners()

function loadEventListeners(){
    //DOM LOAD EVENT
    document.addEventListener('DOMContentLoaded',getTasks)
    //ADD TASK EVENT M1
    form.addEventListener('keypress', addTask1)
    //ADD TASK EVENT M2
    form.addEventListener('submit',addTask2)
    //REMOVE TASK EVENT
    taskList.addEventListener('click',removeTask)
    //CLEAR TASK EVENT
    clearBtn.addEventListener('click',clearTasks)
    //FILTER TASKS EVENT
    filter.addEventListener('keyup',filterTasks)
    
}

//GET TASK FROM LS

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task){
        //CREATE li ELEMENT
        const li = document.createElement('li')
        //ADD CLASS
        li.className = 'collection-item'
        //CREATE TEXT NODE AND APPEND TO LI
        li.appendChild(document.createTextNode(task))
        //CREATE DELETE LINK
        const link = document.createElement('a')
        //ADD CLASS
        link.className = 'delete-item secondary-content'
        //ADD ICON HTML
        link.innerHTML = '<i class = "fa fa-remove"></i>'
        //APPEND THE LINK TO li
        li.appendChild(link)
        //APPEND li to ul
        taskList.appendChild(li) 
    })
}


//ADD TASK
function addTask1(e){
    if(e.key === 'Enter'){
        if(taskInput.value === ''){
            alert('Add a task')
        }else{
    
            //CREATE li ELEMENT
            const li = document.createElement('li')
            //ADD CLASS
            li.className = 'collection-item'
            //CREATE TEXT NODE AND APPEND TO LI
            li.appendChild(document.createTextNode(taskInput.value))
            //CREATE DELETE LINK
            const link = document.createElement('a')
            //ADD CLASS
            link.className = 'delete-item secondary-content'
            //ADD ICON HTML
            link.innerHTML = '<i class = "fa fa-remove"></i>'
            //APPEND THE LINK TO li
            li.appendChild(link)
            //APPEND li to ul
            taskList.appendChild(li) 
            //STORE IN LS
            storeTaskInLocalStorage(taskInput.value)
            
        }
    
        //CLEAR INPUT
        taskInput.value = ''

        e.preventDefault()
    }
}

function addTask2(e){
    if(taskInput.value === ''){
        alert('Add a task')
    }else{

        //CREATE li ELEMENT
        const li = document.createElement('li')
        //ADD CLASS
        li.className = 'collection-item'
        //CREATE TEXT NODE AND APPEND TO LI
        li.appendChild(document.createTextNode(taskInput.value))
        //CREATE DELETE LINK
        const link = document.createElement('a')
        //ADD CLASS
        link.className = 'delete-item secondary-content'
        //ADD ICON HTML
        link.innerHTML = '<i class = "fa fa-remove"></i>'
        //APPEND THE LINK TO li
        li.appendChild(link)
        //APPEND li to ul
        taskList.appendChild(li) 
        //STORE IN LS
        storeTaskInLocalStorage(taskInput.value)

    }

    //CLEAR INPUT
    taskInput.value = ''

    e.preventDefault()
}

//STORE TASK
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task)

    localStorage.setItem('tasks',JSON.stringify(tasks))
}

//REMOVE TASK
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
       if(confirm('Are u sure?')){
        e.target.parentElement.parentElement.remove()

        //REMOVE FROM LS
        removeTaskFromLocalStorage(e.target.parentElement.parentElement)
       }
    }
}

//REMOVE TASK FROM LS
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index,1)
        }
    })

    localStorage.setItem('tasks' , JSON.stringify(tasks))
}

//CLEAR TASK
function clearTasks(){
    //METHOD 1 (SLOWER)
    // taskList.innerHTML = ''
    
    //METHOD 2 (FASTER)
    let lis = taskList.children

    lis = Array.from(lis)

    lis.forEach(function(li){
        li.remove()
        removeTaskFromLocalStorage(li)
    })


    //METHOD 3 (ALSO FASTER)
    // while(taskList.firstChild){
    //     taskList.removeChild(taskList.firstChild)
    // }
}

//FILTER TASKS

function filterTasks(e){
    const text = e.target.value.toLowerCase()

    document.querySelectorAll('.collection-item').forEach(
    function(task){
        const item = task.firstChild.textContent
        if(item.toLowerCase().indexOf(text) !== -1){
            task.style.display = 'block'
        }else{
            task.style.display = 'none'
        }
    })
}

