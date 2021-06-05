const { nanoid } = require('nanoid');
const books = require('../models/books');
const { success, fail, error, statusCode, statusMessage } = require('../helpers/constanta');

const saveBookHandler = (request, h) => {
    const { 
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading } = request.payload;

    if (!name) {
        const response = h
        .response({
            status: fail,
            message: statusMessage.saveBookWithoutName,
        })
        .code(statusCode.badRequest);
        return response;
    }

    if (readPage > pageCount) {
        const response = h
        .response({
            status: fail,
            message:
              statusMessage.saveBookReadPageBiggerThanPageCount,
        })
        .code(statusCode.badRequest);
        return response;
    }

    const id = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
      };
      books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: success,
            message: statusMessage.saveSuccessful,
            data: {
                bookId: id,
            },
        });
        response.code(statusCode.saved);
        return response;
    }

    const response = h.response({
        status: error,
        message: statusMessage.saveUnsuccessful,
    });
    response.code(statusCode.error);
    return response;
};

const getAllBookHandler = (req, h) => {
    const { name, reading, finished } = req.query;
  
    const response = h.response({
      status: success,
      data: {
        books: books.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
  
    if (reading === '1') {
      return {
        status: success,
        data: {
          books: books
            .filter((book) => book.reading === true)
            .map((book) => ({
              id: book.id,
              name: book.name,
              publisher: book.publisher,
            })),
        },
      };
    }
  
    if (reading === '0') {
      return {
        status: success,
        data: {
          books: books
            .filter((book) => book.reading === false)
            .map((book) => ({
              id: book.id,
              name: book.name,
              publisher: book.publisher,
            })),
        },
      };
    }
  
    if (finished === '1') {
      return {
        status: success,
        data: {
          books: books
            .filter((book) => book.finished === true)
            .map((book) => ({
              id: book.id,
              name: book.name,
              publisher: book.publisher,
            })),
        },
      };
    }
  
    if (finished === '0') {
      return {
        status: success,
        data: {
          books: books
            .filter((book) => book.finished === false)
            .map((book) => ({
              id: book.id,
              name: book.name,
              publisher: book.publisher,
            })),
        },
      };
    }
  
    if (name !== undefined) {
      return {
        status: success,
        data: {
          books: books
            .filter((book) => book.name.toLowerCase().includes(name.toLowerCase()))
            .map((book) => ({
              id: book.id,
              name: book.name,
              publisher: book.publisher,
            })),
        },
      };
    }
  
    response.code(statusCode.success);
    return response;
};

const getBookById = (request, h) => {
    const { id } = request.params;
  
    const book = books.filter((bookss) => bookss.id === id)[0];
  
    if (book !== undefined) {
      return {
        status: success,
        data: {
          book,
        },
      };
    }
  
    const response = h.response({
      status: fail,
      message: statusMessage.bookNotFound,
    });
    response.code(statusCode.notfound);
    return response;
  };

  const updateBookById = (request, h) => {
    const { id } = request.params;
  
    const {
      name, year, author, summary, publisher, pageCount, readPage, reading,
    } = request.payload;
  
    const updatedAt = new Date().toISOString();
  
    const index = books.findIndex((book) => book.id === id);
  
    if (!name) {
      const response = h.response({
        status: fail,
        message: statusMessage.updateBookWithoutName,
      });
      response.code(statusCode.badRequest);
      return response;
    }
  
    if (readPage > pageCount) {
      const response = h.response({
        status: fail,
        message: statusMessage.updateBookReadPageBiggerThanPageCount,
      });
      response.code(statusCode.badRequest);
      return response;
    }
  
    if (index !== -1) {
      books[index] = {
        ...books[index],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        updatedAt,
      };
  
      const response = h.response({
        status: success,
        message: statusMessage.updateSuccessful,
      });
      response.code(statusCode.success);
      return response;
    }
    const response = h.response({
      status: fail,
      message: statusMessage.updateIdNotFound,
    });
    response.code(statusCode.notfound);
    return response;
  };

  const deleteBookById = (request, h) => {
    const { id } = request.params;
  
    const index = books.findIndex((book) => book.id === id);
  
    if (index !== -1) {
      books.splice(index, 1);
      const response = h.response({
        status: success,
        message: statusMessage.deleteSuccessful,
      });
      response.code(statusCode.success);
      return response;
    }
  
    const response = h.response({
      status: fail,
      message: statusMessage.deleteIdNotFound,
    });
    response.code(statusCode.notfound);
    return response;
  };

module.exports = { saveBookHandler, getAllBookHandler, getBookById, updateBookById, deleteBookById };
