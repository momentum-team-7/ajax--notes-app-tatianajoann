const notesUrl = "http://localhost:3000/notes/"
let form = document.querySelector("form")
const button = document.querySelector(".submit-note")
let deleteBtn = document.querySelector(".delete-button")

window.addEventListener('click', e => {
    e.preventDefault();
})

button.addEventListener('click', e => {
    postNotes();
})


  




function doNotes () {
    fetch(notesUrl)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        for (let note of data) {
          displayNotes(note)
        }
        return data
      })
     
  }


  function displayNotes (noteObj) {
    let noteList = document.querySelector(".posted-notes")
    let itemEl = document.createElement('div')
    let deleteBtn = document.createElement("button")
    let title = document.createElement("p")
    title.className = "note-title"
    title.innerHTML = noteObj.title;
    deleteBtn.innerHTML = "Delete";
    deleteBtn.className = "delete-button"
    deleteBtn.addEventListener('click', e=> {
      deleteNote(e.target);
    })
    itemEl.id = noteObj.id
    itemEl.classList.add("note-object")
   // displayNoteText(itemEl, noteObj)
    itemEl.appendChild(title)
    itemEl.appendChild(deleteBtn)
    noteList.appendChild(itemEl)
    clearInputs()
  }
  
  // function displayNoteText (noteListItem, noteObj) {
  //   noteListItem.innerHTML = `${noteObj.title}`
  // }

function clearInputs() {
  const inputs = document.querySelectorAll('textarea')
  for (let field of inputs) {
    field.value = ''
  }
}
  
// function postNotes() {
//     return fetch(notesUrl).then(r => r.json()).then(data => console.log(data))
// }

function postNotes() {
    let titleNote = document.querySelector(".note-title").value
    let bodyNote = document.querySelector(".note-body").value
    if (titleNote.length > 1 || bodyNote.length > 1) {
        fetch(notesUrl, {
        method: 'POST', 
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify({
        title: titleNote,
        body: bodyNote
        })}).then(
            r => r.json()
        ).then(
            data => {
                displayNotes(data)
            }
        ).catch(
            e => {console.log(e)}
        );
    }
    titleNote.value = "";
    bodyNote.value = "";
}


function deleteNote (element) {
  const noteId = element.parentElement.id
  fetch(`${notesUrl}${noteId}`, {
    method: 'DELETE'
  }).then(function () {
    element.parentElement.remove()
  })
}

doNotes()