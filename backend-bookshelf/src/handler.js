const { nanoid } = require("nanoid")

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

  const id = nanoid(16)
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt

  const newBook = {
    id: id,
    name: name,
    year: parseInt(year),
    author: author,
    summary: summary,
    publisher: publisher,
    pageCount: parseInt(pageCount),
    readPage: parseInt(readPage),
    finished: false,
    reading: reading === "yes" ? true : false,
    insertedAt: insertedAt,
    updatedAt: updatedAt
  }

  books.push(newBook)

  const isSuccess = books.filter((book) => book.id === id)

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        id: id,
        ...newBook,
      }
    })
    response.code(201)
    return response
  }

  const response = h.response({
    status: "fail",
    message: `Buku gagal ditambahkan`,
    data: newBook,
  })
  response.code(500)
  return response
}

const getAllbooksHandler = () => {
  const filterBook = books.map((data) => ({
    id: data.id,
    name: data.name,
    publisher: data.publisher,
  }))

  return {
    status: "success",
    data: {
      books: filterBook,
    },
  }
}

const getBookByIdHandler = (request, h) => {
  const { id } = request.params

  const book = books.filter((n) => n.id === id)[0]
  const filterBook = book.map((data) => ({
    id: data.id,
    name: data.name,
    publisher: data.publisher,
  }))

  if (book !== undefined) {
    return {
      status: "success",
      data: {
        book: filterBook,
      },
    }
  }

  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  })
  response.code(404)
  return response
}

const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params

  const index = books.findIndex((book) => book.id === id)

  if (index !== -1) {
    books.splice(index, 1)
    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  })
  response.code(404)
  return response
}

const updateBookByIdHandler = (request, h) => {
  const { id } = request.params
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

  const updatedAt = new Date().toISOString()

  const index = books.findIndex((book) => book.id === id)

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
      reading: reading === "yes" ? true : false,
      updatedAt
    }

    const filterBook = books.find((book) => book.id === id)

    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
      book: filterBook
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
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
