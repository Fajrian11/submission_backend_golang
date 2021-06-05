const { saveBookHandler, getAllBookHandler, getBookById, updateBookById, deleteBookById } = require('../handlers/handler');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: saveBookHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBookHandler,
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBookById,
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: updateBookById,
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBookById,
    },
];

module.exports = routes;
