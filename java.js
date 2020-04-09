const bookList = document.querySelector("#book-list");
const addBookForm = document.querySelector('#add-book-form')

function renderBook(book){
    let li = document.createElement("li");
    let title = document.createElement("span");
    let author = document.createElement("span");
    let rating = document.createElement("span");
    let read = document.createElement("span");
    let cross = document.createElement("div");
    
    li.setAttribute('data-id', book.id);
    title.textContent = book.data().title;
    author.textContent = book.data().author;
    rating.textContent = book.data().rating;
    read.textContent = book.data().read;
    cross.textContent = 'x';

    li.appendChild(title);
    li.appendChild(author);
    li.appendChild(rating);
    li.appendChild(read);
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
        read: addBookForm.read.value
    });
    addBookForm.title.value = '';
    addBookForm.author.value = '';
    addBookForm.rating.value = '';
    addBookForm.read.value = '';
})



// REALTIME LISTENER
db.collection('myLibrary').orderBy('title').onSnapshot(snapshot=>{
    let changes = snapshot.docChanges();
    changes.forEach((change)=>{
        if(change.type == 'added'){
            renderBook(change.doc)
        } else if(change.type = 'removed'){
            let li = bookList.querySelector('[data-id='+change.doc.id+']');
            bookList.removeChild(li);
        }
        
        
    })
})