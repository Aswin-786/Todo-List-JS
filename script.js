const form = document.getElementById('form')
const input = document.getElementById('input')
const list = document.getElementById('list')

const saved = JSON.parse(localStorage.getItem("saved"))

if(saved) {
 saved.forEach((saved) => {
   addList(saved)
 })
}


form.addEventListener('submit', (e) => {

 e.preventDefault()

 addList()

})

function addList(saved) {


 let text = input.value
 console.log('entered')

 if(saved) {
   text = saved.text
 }

 // ithu namk completed ayahtind tick pokathe refresh cheythalam undkan vendi aanu.allengil ith completed
 // aanengil red line varum but refresh cheymbo varilla
 
 if(text) {
   const todo = document.createElement('li')

   if(saved && saved.completed) {
     todo.classList.add('completed')
   }
   todo.innerText = text
   list.appendChild(todo)
   input.value = ''



   todo.addEventListener('click', () => {
     todo.classList.toggle('completed')
     updateStorage()
   })



   todo.addEventListener('contextmenu', (e) => {
     e.preventDefault();

     todo.remove()

     updateStorage()

   })

   updateStorage()
 }
}


function updateStorage() {
 const listEl = document.querySelectorAll('li')

 const saved = []

 listEl.forEach((listEl) => {
   saved.push({
     text:listEl.innerText,

     completed:listEl.classList.contains('completed')
   })
 })

 localStorage.setItem("saved", JSON.stringify(saved))


}
