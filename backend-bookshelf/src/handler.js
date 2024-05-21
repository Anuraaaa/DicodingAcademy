const { nanoid } = require('nanoid')

const books = []

const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
   
    const id = nanoid(16)
    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt
   
    const newBook = {
        name, year, author, summary, publisher, pageCount, readPage, reading, insertedAt, updatedAt    
    }
   
    books.push(newBook)
   
    const isSuccess = books.filter((book) => book.id === id).length > 0
   
    if (isSuccess) {
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
            bookId: id,
        }
      })
      response.code(201)
      return response
    }
   
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal ditambahkan',
    })
    response.code(500)
    return response
}

const getAllbooksHandler = () => ({
    status: 'success',
    data: {
      books
    }
  })
   
  const getBookByIdHandler = (request, h) => {
    const { id } = request.params
   
    const book = books.filter((n) => n.id === id)[0]
   
    if (book !== undefined) {
      return {
        status: 'success',
        data: {
          book,
        },
      }
    }
   
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan'
    })
    response.code(404)
    return response
}

module.exports = { 
    addBookHandler, 
    getBookByIdHandler, 
    getAllbooksHandler 
}