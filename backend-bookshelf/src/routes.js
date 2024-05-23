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
        path: '/books/{id}',
        handler: getBookByIdHandler
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: updateBookByIdHandler
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBookByIdHandler
    },
    {
        method: 'GET',
        path: '/books/{id}/',
        handler: getBookByIdHandler
    },
    {
        method: 'PUT',
        path: '/books/{id}/',
        handler: updateBookByIdHandler
    },
    {
        method: 'DELETE',
        path: '/books/{id}/',
        handler: deleteBookByIdHandler
    }
]

module.exports = routes
