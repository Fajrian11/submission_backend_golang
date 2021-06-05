const success = 'success';
const fail = 'fail';
const error = 'error';
const statusCode = {
    success: 200,
    error: 500,
    notfound: 404,
    unauthorized: 401,
    conflict: 409,
    saved: 201,
    badRequest: 400,
    nocontent: 204,
};
const statusMessage = {
    saveBookWithoutName: 'Gagal menambahkan buku. Mohon isi nama buku',
    saveBookReadPageBiggerThanPageCount: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    saveSuccessful: 'Buku berhasil ditambahkan',
    saveUnsuccessful: 'Buku gagal ditambahkan',
    bookNotFound: 'Buku tidak ditemukan',
    updateBookWithoutName: 'Gagal memperbarui buku. Mohon isi nama buku',
    updateBookReadPageBiggerThanPageCount: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    updateSuccessful: 'Buku berhasil diperbarui',
    updateIdNotFound: 'Gagal memperbarui buku. Id tidak ditemukan',
    deleteSuccessful: 'Buku berhasil dihapus',
    deleteIdNotFound: 'Buku gagal dihapus. Id tidak ditemukan',
};

module.exports = { success, fail, error, statusCode, statusMessage };
