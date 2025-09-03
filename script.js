const todo = document.querySelector('#todo');
const date = document.querySelector('#date');
const tasklist = document.querySelector('#tasklist');
const addBtn = document.querySelector('.add');
const counter = document.querySelector('.counter');
const taskSortButton = document.querySelector('.sortTask');
const dateSortButton = document.querySelector('.sortDate')


let list = JSON.parse(localStorage.getItem('tasks')) || [
  { task: "wash dishes", date: "2022-12-12", done: false },
  { task: "make dinner", date: "2022-12-12", done:false }
];

function Addtask() {
  let task = todo.value.trim();
  let dateTime = date.value;

  if (!dateTime || !task) {
    alert('ERROR: Please fill in both the task and the date.');
    return;
  }

  list.push({ task: task, date: dateTime, done: false });
  renderList();
}

function renderList() {
  tasklist.innerHTML = '';
  counter.textContent = `TASK COUNT: ${list.length}`;

  list.forEach((el, index) => {
    const span = document.createElement('span');
    const li = document.createElement('li');
    const p = document.createElement('p')
    p.innerText = `${el.task} - ${el.date}`
    const taskText =  p

    li.appendChild(taskText);
  

    const taskLine =  document.querySelector('task-list')
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox';
    checkbox.checked = el.done

    checkbox.addEventListener('change', () => {
      if(checkbox.checked){
        el.done = true
        taskText.classList.add('complete')
 
      }
      else{
        el.done = false
       
        taskText.classList.remove('complete')
      }
      localStorage.setItem('tasks', JSON.stringify(list));
    })
    
    

   
li.prepend(checkbox);
 console.log({ task: el.task, date: el.date, done: el.done });

    const delBtn = document.createElement('button');
    delBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    delBtn.classList.add('delete');
    delBtn.addEventListener('click', () => {
      deleteBtn(index);
    });

    const editBtn = document.createElement('button');
    editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    editBtn.classList.add('edit');
    editBtn.addEventListener('click', () => {
      editTask(li, index);
    });

    li.appendChild(span);
    span.appendChild(editBtn);
    span.appendChild(delBtn);
    tasklist.appendChild(li);


     
  });
  

  localStorage.setItem('tasks', JSON.stringify(list));
  todo.value = '';
  date.value = '';
}

function deleteBtn(index) {
  list.splice(index, 1);
  renderList();
}

function editTask(li,index) {
  const editBlock = document.createElement('div');
  const originalTask = list[index]
  const originalContent = li.innerHTML;
  editBlock.innerHTML = `
  <input type="text" class="edit-input" value="${originalTask.task}"> 
  <input type="date" class="edit-date" value="${originalTask.date}"> 
  <button class="edit-submit">submit</button>
  <button class="edit-cancel">✖</button>
  `
  
  li.innerHTML = ""

  li.prepend(editBlock);

  const submit = document.querySelector('.edit-submit');
  const editInput = document.querySelector('.edit-input')
  const editDate = document.querySelector('.edit-date')
  const cancel = document.querySelector('.edit-cancel')


  submit.addEventListener('click', () => {
    const Inputvalue = editInput.value;
    const datevalue = editDate.value;

    list[index] = {task:Inputvalue, date:datevalue ,done:  originalTask.done};
   
li.innerHTML = originalContent;
    renderList();
  })
  cancel.addEventListener('click', () => {
    renderList();
    li.innerHTML = originalContent
  })

  
}

 let isSortedTask = false
let isSortedDate = false
 function sortTask(){

 if (isSortedTask == false){
  taskSortButton.textContent = `SORT BY: TASK ⬇️`
  list.sort((a, b) => a.task.localeCompare(b.task));  console.log(list)
  renderList()
  isSortedTask = true
 }
 else{
  taskSortButton.textContent = `SORT BY: TASK ⬆️`
  list.sort((a, b) => b.task.localeCompare(a.task));  console.log(list)
  renderList()
  isSortedTask = false
 }
 }



 function sortDate(){
 if (isSortedDate == false){
  dateSortButton.textContent = `SORT BY: DATE ⬇️`
  list.sort((a, b) => a.date.localeCompare(b.date));  console.log(list)
  renderList()
  isSortedDate = true
 }
 else{
  taskSortButton.textContent = `SORT BY: DATE ⬆️`
  list.sort((a, b) => b.date.localeCompare(a.date));  console.log(list)
  renderList()
  isSortedDate = false
 }
  
 }


addBtn.addEventListener('click', Addtask);
document.addEventListener('DOMContentLoaded', renderList);
taskSortButton.addEventListener('click', sortTask);
dateSortButton.addEventListener('click', sortDate);