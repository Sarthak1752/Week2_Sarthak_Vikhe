"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterBooksByAuthor = exports.getMinBookPrice = exports.getMaxBookPrice = exports.getAverageBookPrice = exports.getTotalBookPrice = exports.sortBooksByPrice = exports.getBookTitles = exports.filterExpensiveBooks = void 0;
// Function to filter books costing more than $15
const filterExpensiveBooks = (books) => {
    return books.filter(book => book.price > 15);
};
exports.filterExpensiveBooks = filterExpensiveBooks;
// Function to get book titles
const getBookTitles = (books) => {
    return books.map(book => book.title);
};
exports.getBookTitles = getBookTitles;
// Function to sort books by price in descending order
const sortBooksByPrice = (books) => {
    return books.slice().sort((a, b) => b.price - a.price);
};
exports.sortBooksByPrice = sortBooksByPrice;
// Function to calculate total price of all books
const getTotalBookPrice = (books) => {
    return books.reduce((total, book) => total + book.price, 0);
};
exports.getTotalBookPrice = getTotalBookPrice;
// Function to calculate average price of all books
const getAverageBookPrice = (books) => {
    const total = (0, exports.getTotalBookPrice)(books);
    return total / books.length;
};
exports.getAverageBookPrice = getAverageBookPrice;
// Function to find maximum price among all books
const getMaxBookPrice = (books) => {
    return Math.max(...books.map(book => book.price));
};
exports.getMaxBookPrice = getMaxBookPrice;
// Function to find minimum price among all books
const getMinBookPrice = (books) => {
    return Math.min(...books.map(book => book.price));
};
exports.getMinBookPrice = getMinBookPrice;
// Function to filter books by author
const filterBooksByAuthor = (books, author) => {
    return books.filter(book => book.author.toLowerCase().includes(author.toLowerCase()));
};
exports.filterBooksByAuthor = filterBooksByAuthor;
//# sourceMappingURL=exercise.js.map