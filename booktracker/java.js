const bookList = document.querySelector("#book-list"); // GITLETS WORKS
const addBookForm = document.querySelector('#add-book-form')

function renderBook(book){
    let li = document.createElement("li");
    let title = document.createElement("span");
    let author = document.createElement("span");
    let rating = document.createElement("span");
    let cross = document.createElement("div");
    
    li.setAttribute('data-id', book.id);
    title.textContent = book.data().title;
    author.textContent = book.data().author;
    rating.textContent = book.data().rating;
    cross.textContent = 'x';

    li.appendChild(title);
    li.appendChild(author);
    li.appendChild(rating);
    li.appendChild(cross)
    bookList.appendChild(li);

//DELETING DATA WITH THE CROSS
    cross.addEventListener('click',(e)=>{
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('myLibrary').doc(id).delete()
    })

}

// GETTING DATA
// db.collection('myLibrary').get().then((snapshot)=> {
//     snapshot.docs.forEach(book => {
//         renderBook(book)
//     });
// })


//SAVING NEW DATA
addBookForm.addEventListener('submit',(e) =>{
    e.preventDefault();
    db.collection('myLibrary').add({
        title: addBookForm.title.value,
        author: addBookForm.author.value,
        rating: addBookForm.rating.value,
    });
    addBookForm.title.value = '';
    addBookForm.author.value = '';
    addBookForm.rating.value = '';
})



// REALTIME LISTENER
db.collection('myLibrary').orderBy('title').onSnapshot(snapshot=>{
    let changes = snapshot.docChanges();
    console.log(changes)
    changes.forEach((change)=>{
        if(change.type == 'added'){
            renderBook(change.doc)
        } else if(change.type = 'removed'){
            let li = bookList.querySelector('[data-id='+change.doc.id+']');
            bookList.removeChild(li);
        }
        
        
    })
})


// RANGE STYLING
var elem = document.querySelector('input[type="range"]');

var rangeValue = function(){
  var newValue = elem.value;
  var target = document.querySelector('.rangeValue');
  target.innerHTML = newValue;
}

elem.addEventListener("input", rangeValue);