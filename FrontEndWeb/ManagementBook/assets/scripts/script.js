const books = [];
const RENDER_EVENT = 'render-book';
const SAVED_EVENT = 'saved-book';
const STORAGE_KEY = 'BOOKS_STORAGE';
let activeToast = false;
let toastTimer = false;

document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('form');
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const book = document.getElementById('title');
        const year = document.getElementById('date');
        const author = document.getElementById('author');
        
        if (book.value == "") {
            createCustomEvent("Judul buku tidak boleh kosong!");            
        }
        else if (author.value == "") {
            createCustomEvent("Nama pembuat buku tidak boleh kosong!");            
        }
        else if (year.value == "") {
            createCustomEvent("Tahun rilis tidak boleh kosong!");            
        }
        else {
            addBook();
        }
    });
    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

document.addEventListener(RENDER_EVENT, function () {
    const unreadBookList = document.getElementById('hasntRead');
    unreadBookList.innerHTML = '';

    const readBookList = document.getElementById('hasRead');
    readBookList.innerHTML = '';

    for (const bookItem of books) {
        const bookElement = makeBook(bookItem);
        if (!bookItem.isComplete)
            unreadBookList.append(bookElement);
        else
            readBookList.append(bookElement);
    }
});

document.addEventListener(SAVED_EVENT, function (event) {

    if (isValidToast()) {
        deleteToast();
    }
    createToast(event.detail.messages)
});


function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const dateInput = document.getElementById('date').value;
    const date = new Date(dateInput);
    const year = date.getFullYear();
    const generatedID = generateId();

    const bookObject = generateBookObject(generatedID, title, author, year, false);
    books.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData("Berhasil menambahkan buku");
}

function generateId() {
    return +new Date();
}

function generateBookObject(id, title, author, year, isComplete) {
    return {
        id,
        title,
        author,
        year,
        isComplete
    }
}

function makeBook(bookObject) {
    const textTitle = document.createElement('h2');
    textTitle.innerText = `Judul: ${bookObject.title}`;

    const textTimestamp = document.createElement('p');
    textTimestamp.innerText = `Tahun terbit: ${bookObject.year}`;

    const textContainer = document.createElement('div');
    textContainer.classList.add('inner');
    textContainer.append(textTitle, textTimestamp);

    const container = document.createElement('div');
    container.classList.add('item', 'shadow');
    container.append(textContainer);
    container.setAttribute('id', `book-${bookObject.id}`);


    if (bookObject.isComplete) {
        const undoButton = document.createElement('span');
        undoButton.classList.add('undo-button');
        undoButton.classList.add('material-symbols-outlined');
        undoButton.textContent = 'undo'

        undoButton.addEventListener('click', function () {
            undoBookFromCompleted(bookObject.id);
        });

        const trashButton = document.createElement('span');
        trashButton.classList.add('trash-button');
        trashButton.classList.add('material-symbols-outlined');
        trashButton.textContent = 'delete';

        trashButton.addEventListener('click', function () {
            removeBookFromCompleted(bookObject.id);
        });

        container.append(undoButton, trashButton);
    } else {
        const checkButton = document.createElement('span');
        checkButton.classList.add('check-button');
        checkButton.classList.add('material-symbols-outlined');
        checkButton.textContent = 'check_circle';

        checkButton.addEventListener('click', function () {
            addBookToCompleted(bookObject.id);
        });

        const trashButton = document.createElement('span');
        trashButton.classList.add('trash-button');
        trashButton.classList.add('material-symbols-outlined');
        trashButton.textContent = 'delete';

        trashButton.addEventListener('click', function () {
            removeBookFromCompleted(bookObject.id);
        });

        container.append(checkButton, trashButton);
    }

    return container;
}

function addBookToCompleted(bookId) {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.isComplete = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData("Berhasil menyelesaikan bacaan buku");
}

function findBook(bookId) {
    for (const bookItem of books) {
        if (bookItem.id === bookId) {
            return bookItem;
        }
    }
    return null;
}

function findBookIndex(bookId) {
    for (const index in books) {
        if (books[index].id === bookId) {
            return index;
        }
    }

    return -1;
}

function removeBookFromCompleted(bookId) {
    const bookTarget = findBookIndex(bookId);

    if (bookTarget === -1) return;

    books.splice(bookTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData("Berhasil menghapus buku");
}

function undoBookFromCompleted(bookId) {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.isComplete = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData("Berhasil menambahkan buku belum dibaca");
}

function saveData(message) {
    if (isStorageExist()) {
        const parsed = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parsed);
        createCustomEvent(message)
    }
}

function isStorageExist() /* boolean */ {
    if (typeof (Storage) === undefined) {
        alert('Browser kamu tidak mendukung local storage');
        return false;
    }
    return true;
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if (data !== null) {
        for (const book of data) {
            books.push(book);
        }
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
}

function createToast(message) {
    
    if (!isValidToast()) {
        const toast = document.createElement('div');
        toast.id = 'toast';
        toast.classList.add('show-toast');
        toast.textContent = message;
        activeToast = true;
        const wrapper = document.getElementById('wrapper');
        wrapper.append(toast);

        toastTimer = setTimeout(() => {
           deleteToast();         
        }, 3000);
    }
}

function deleteToast() {
    if (isValidToast()) {
        const toast = document.getElementById('toast');
        toast.remove();
        clearTimeout(toastTimer);
        toastTimer = false;
        activeToast = false;
    }
}

function isValidToast() {

    if (activeToast === true)
        return true;

    return false;
}

function createCustomEvent(message) {
    const eventCustom = new CustomEvent(SAVED_EVENT, {
        detail: {
            messages: message
        }
    });
    document.dispatchEvent(eventCustom);                
}