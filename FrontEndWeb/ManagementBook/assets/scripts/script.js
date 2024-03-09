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
        const date = document.getElementById('date');
        
        if (book.value == "") {
            createCustomEvent("Nama buku tidak boleh kosong!");            
        }
        else if (date.value == "") {
            createCustomEvent("Tanggal tidak boleh kosong!");            
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
    const uncompletedTODOList = document.getElementById('hasntRead');
    uncompletedTODOList.innerHTML = '';

    const completedTODOList = document.getElementById('hasRead');
    completedTODOList.innerHTML = '';

    for (const bookItem of books) {
        const bookElement = makeBook(bookItem);
        if (!bookItem.hasRead)
            uncompletedTODOList.append(bookElement);
        else
            completedTODOList.append(bookElement);
    }
});

document.addEventListener(SAVED_EVENT, function (event) {

    if (isValidToast()) {
        deleteToast();
    }
    createToast(event.detail.messages)
});


function addBook() {
    const textBook = document.getElementById('title').value;
    const timestamp = document.getElementById('date').value;

    const generatedID = generateId();
    const bookObject = generateBookObject(generatedID, textBook, timestamp, false);
    books.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData("Berhasil menambahkan buku");
}

function generateId() {
    return +new Date();
}

function generateBookObject(id, book, timestamp, hasRead) {
    return {
        id,
        book,
        timestamp,
        hasRead
    }
}

function makeBook(bookObject) {
    const textTitle = document.createElement('h2');
    textTitle.innerText = bookObject.book;

    const textTimestamp = document.createElement('p');
    textTimestamp.innerText = bookObject.timestamp;

    const textContainer = document.createElement('div');
    textContainer.classList.add('inner');
    textContainer.append(textTitle, textTimestamp);

    const container = document.createElement('div');
    container.classList.add('item', 'shadow');
    container.append(textContainer);
    container.setAttribute('id', `book-${bookObject.id}`);


    if (bookObject.hasRead) {
        const undoButton = document.createElement('span');
        undoButton.classList.add('undo-button');
        undoButton.classList.add('material-symbols-outlined');
        undoButton.textContent = 'undo'

        undoButton.addEventListener('click', function () {
            undoTaskFromCompleted(bookObject.id);
        });

        const trashButton = document.createElement('span');
        trashButton.classList.add('trash-button');
        trashButton.classList.add('material-symbols-outlined');
        trashButton.textContent = 'delete';

        trashButton.addEventListener('click', function () {
            removeTaskFromCompleted(bookObject.id);
        });

        container.append(undoButton, trashButton);
    } else {
        const checkButton = document.createElement('span');
        checkButton.classList.add('check-button');
        checkButton.classList.add('material-symbols-outlined');
        checkButton.textContent = 'check_circle';

        checkButton.addEventListener('click', function () {
            addTaskToCompleted(bookObject.id);
        });

        container.append(checkButton);
    }

    return container;
}

function addTaskToCompleted(bookId) {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.hasRead = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData("Berhasil menambah task complete");
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

function removeTaskFromCompleted(bookId) {
    const bookTarget = findBookIndex(bookId);

    if (bookTarget === -1) return;

    books.splice(bookTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData("Berhasil menghapus task complete");
}

function undoTaskFromCompleted(bookId) {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.hasRead = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData("Berhasil membatalkan task complete");
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