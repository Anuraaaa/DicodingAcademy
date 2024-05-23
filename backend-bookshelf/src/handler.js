const { nanoid } = require('nanoid')

const books = []

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload

  if ((name && name === '') || !name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    })
    response.code(400)
    return response
  }

  if (readPage && pageCount && parseInt(readPage) > parseInt(pageCount)) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
    return response
  }

  if (!readPage || !pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi readPage atau pageCount'
    })
    response.code(400)
    return response
  }

  const id = nanoid(16)
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt

  const parsingYear = parseInt(year)
  const isReading = reading === 'yes'
  const isFinish = parseInt(pageCount) === parseInt(readPage)
  const newBook = {
    id,
    name,
    year: parsingYear,
    author,
    summary,
    publisher,
    pageCount: parseInt(pageCount),
    readPage: parseInt(readPage),
    finished: isFinish,
    reading: isReading,
    insertedAt,
    updatedAt
  }

  books.push(newBook)

  const isSuccess = books.filter((book) => book.id === id)

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id
      }
    })
    response.code(201)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan'
  })
  response.code(500)
  return response
}

const getAllbooksHandler = (_, h) => {
  const filterBook = books.map((data) => ({
    id: data.id,
    name: data.name,
    publisher: data.publisher
  }))

  const response = h.response({
    status: 'success',
    data: {
      books: filterBook
    }
  })
  response.code(200)
  return response
}

const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params

  const book = books.filter((n) => n.id === bookId)[0]

  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book
      }
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan'
  })
  response.code(404)
  return response
}

const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params

  const index = books.findIndex((book) => book.id === bookId)

  if (index !== -1) {
    books.splice(index, 1)
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

const updateBookByIdHandler = (request, h) => {
  const { bookId } = request.params
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload

  if ((name && name === '') || !name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    })
    response.code(400)
    return response
  }

  if (readPage && pageCount && parseInt(readPage) > parseInt(pageCount)) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
    return response
  }

  if (!readPage || !pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi readPage atau pageCount'
    })
    response.code(400)
    return response
  }

  const updatedAt = new Date().toISOString()
  const index = books.findIndex((book) => book.id === bookId)
  const isFinish = parseInt(pageCount) === parseInt(readPage)
  const isReading = reading === 'yes'

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year: parseInt(year),
      author,
      summary,
      publisher,
      pageCount: parseInt(pageCount),
      readPage: parseInt(readPage),
      finished: isFinish,
      reading: isReading,
      updatedAt
    }

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui'
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

module.exports = {
  addBookHandler,
  getBookByIdHandler,
  getAllbooksHandler,
  deleteBookByIdHandler,
  updateBookByIdHandler
}
