const { addBookHandler, getAllbooksHandler, getBookByIdHandler } = require("./handler")

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
        method: 'GET',
        path: '/books/{id}',
        handler: getBookByIdHandler
    }
]
 
module.exports = routes