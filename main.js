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

let postedNotes = document.querySelector(".posted-notes")
postedNotes.addEventListener('click', e => {
  if (e.target.classList.contains("update-note")) {
    updateNote(e.target)
  }
  if (e.target.classList.contains("cancel")) {
    hideEditControls(e.target.parentElement)
  }
})
  


//this function just gets the data from the API , calling Display notes function

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

// this function displays the data in the browser / html. building/creating the html
  function displayNotes (noteObj) {
    let noteList = document.querySelector(".posted-notes")
    let itemEl = document.createElement('div')
    let deleteBtn = document.createElement("button")
    let editBtn = document.createElement("button")
    let title = document.createElement("p")
    let body = document.createElement("p")
    body.className = "note-body"
    body.innerHTML = noteObj.body;
    body.style.display = "none"
    title.className = "note-title"
    title.innerHTML = noteObj.title;
    deleteBtn.innerHTML = "Delete";
    deleteBtn.className = "delete-button"
    deleteBtn.addEventListener('click', e=> {
      deleteNote(e.target);
    })
    editBtn.innerHTML = "Edit";
    editBtn.classname = "edit"
    editBtn.addEventListener('click', e=> {
      editNote(e.target);
    })
    itemEl.id = noteObj.id
    itemEl.classList.add("note-object")
    itemEl.appendChild(body)
    itemEl.appendChild(title)
    itemEl.appendChild(deleteBtn)
    itemEl.appendChild(editBtn)
    noteList.appendChild(itemEl)
    clearInputs()
  }
  
 
// clears out the user input, I might be able to just call this in post notes instead of display notes? idk. 
function clearInputs() {
  const inputs = document.querySelectorAll('textarea')
  for (let field of inputs) {
    field.value = ''
  }
}
  
// this function gets the info by class name and sends to api to create a new note (could not get date to work)
function postNotes() {
    let titleNote = document.querySelector(".note-title").value
    let bodyNote = document.querySelector(".note-body").value
    if (titleNote.length > 1 || bodyNote.length > 1) {
        fetch(notesUrl, {
        method: 'POST', 
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify({
        title: titleNote,
        body: bodyNote,
        //date_created: moment(dateCreated).format('llll')
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

// gets the id from the html and sends it to api to be deleted, then it removes the html
function deleteNote (element) {
  const noteId = element.parentElement.id
  fetch(`${notesUrl}${noteId}`, {
    method: 'DELETE'
  }).then(function () {
    element.parentElement.remove()
  })
}

// when the save button is clicked, this function gets the note id, the title and the body
// and sends it to the api to change it
function updateNote (element) {
  const noteId = element.parentElement.id
  const editTitle = document.querySelector(".edit-title").value
  const editBody = document.querySelector(".edit-body").value
  fetch(`${notesUrl}${noteId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: editTitle,
      body: editBody,
    })
  })
    .then(function (res) {
      return res.json()
    })
    .then(function (data) {
      renderTodoText(element.parentElement, data)
    })
  
}

// runs show edit input when edit is clicked, maybe redundant and could possibly remove
function editNote (element) {
  showEditInput(element.parentElement)
}

// gets the value of the note title and body from the html, updates the HTML to show the edit html things
function showEditInput (noteItem) {
  let noteTitle
  let noteBody
  for (var i = 0; i < noteItem.childNodes.length; i++) {
    if (noteItem.childNodes[i].className === "note-title") {
      noteTitle = noteItem.childNodes[i].innerHTML
    }
    if (noteItem.childNodes[i].className === "note-body") {
      noteBody = noteItem.childNodes[i].innerHTML
    }
  }
  noteItem.innerHTML = `
      <input class="edit-title" value="${noteTitle}">
      <input class="edit-body" value="${noteBody}">
      <button class="update-note" data-note=${noteItem.id}>save</button>
      <button class="cancel">cancel</button>
      `
  noteItem.querySelector('input').select()
}


// hides the edit controls when cancel is clicked
function hideEditControls (noteObj) {
  fetch(`${notesUrl}${noteObj.id}`)
    .then(res => res.json())
    .then(data => {
      renderTodoText(noteObj, data)
    })
}

//resets the html to the original html after editing/cancelling/saving. 
function renderTodoText (itemEl, noteObj) {
  itemEl.innerHTML = "";
  let deleteBtn = document.createElement("button")
  let editBtn = document.createElement("button")
  let title = document.createElement("p")
  let body = document.createElement("p")
  body.className = "note-body"
  body.innerHTML = noteObj.body;
  body.style.display = "none"
  title.className = "note-title"
  title.innerHTML = noteObj.title;
  deleteBtn.innerHTML = "Delete";
  deleteBtn.className = "delete-button"
  deleteBtn.addEventListener('click', e=> {
    deleteNote(e.target);
  })
  editBtn.innerHTML = "Edit";
  editBtn.classname = "edit"
  editBtn.addEventListener('click', e=> {
    editNote(e.target);
  })
  itemEl.id = noteObj.id
  itemEl.classList.add("note-object")
  itemEl.appendChild(body)
  itemEl.appendChild(title)
  itemEl.appendChild(deleteBtn)
  itemEl.appendChild(editBtn)
  
}


// runs the main function that loads the data
doNotes()