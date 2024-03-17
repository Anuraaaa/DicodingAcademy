let activeToast = false;
let toastTimer = false;

function createToast(message) {
    
    if (!isValidToast()) {
        const toast = document.createElement('div');
        toast.id = 'toast';
        toast.classList.add('show-toast');
        toast.textContent = message;
        activeToast = true;
        const wrapper = document.getElementById('container');
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

export {isValidToast, deleteToast, createToast};