const { addBookHandler, getAllbooksHandler, getBookByIdHandler, updateBookByIdHandler, deleteBookByIdHandler } = require('./handler')

/* eslint-disable no-unused-vars */
const routes = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello World'
        }
    },
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllbooksHandler
    },
    {
        method: 'POST',
        path: '/books/',
        handler: addBookHandler
    },
    {
        method: 'GET',
        path: '/books/',
        handler: getAllbooksHandler
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookByIdHandler
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: updateBookByIdHandler
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBookByIdHandler
    },
    {
        method: 'GET',
        path: '/books/{bookId}/',
        handler: getBookByIdHandler
    },
    {
        method: 'PUT',
        path: '/books/{bookId}/',
        handler: updateBookByIdHandler
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}/',
        handler: deleteBookByIdHandler
    }
]

module.exports = routes
