function parseHTML(html) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || '';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();

    const difference = now - date;
    const daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));

    if (daysDifference === 0) {
        return 'Hari ini';
    } else if (daysDifference === 1) {
        return 'Kemarin';
    } else {
        return daysDifference + ' hari lalu';
    }
}

export {
    parseHTML,
    formatDate
};