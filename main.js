const notesUrl = "http://localhost:3000/notes/"


function doNotes () {
    fetch(notesUrl)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        console.log(data)
        for (let note of data) {
          console.log(note)
          displayNotes(note)
        }
      })
  }



  function displayNotes (noteObj) {
    let noteList = document.querySelector(".posted-notes")
    const itemEl = document.createElement('li')
    itemEl.id = noteObj.id
    itemEl.classList.add("note-object")
    displayNoteText(itemEl, noteObj)
    noteList.appendChild(itemEl)
    //clearInputs()
  }
  
  function displayNoteText (noteListItem, noteObj) {
    noteListItem.innerHTML = `${noteObj.title}`
  }














function postNotes() {
fetch(notesUrl, {
  method: 'POST', 
  headers: {"Content-Type": "application/json"}, 
  body: JSON.stringify({"title": "Hi", "body": "COOL"})
})
.then(r => r.json())
.then(
  // whatever you need to do next
)}

doNotes()