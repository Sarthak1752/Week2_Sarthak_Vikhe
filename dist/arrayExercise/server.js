"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const exercise_1 = require("./exercise");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 5000;
// Route to filter expensive books
app.post('/books/filterExpensive', (req, res) => {
    const books = req.body;
    const expensiveBooks = (0, exercise_1.filterExpensiveBooks)(books);
    res.json(expensiveBooks);
});
// Route to get book titles
app.post('/books/getBookTitles', (req, res) => {
    const books = req.body;
    const bookTitles = (0, exercise_1.getBookTitles)(books);
    res.json(bookTitles);
});
// Route to sort books by price
app.post('/books/sortByPrice', (req, res) => {
    const books = req.body;
    const sortedBooks = (0, exercise_1.sortBooksByPrice)(books);
    res.json(sortedBooks);
});
// Route to get total price of all books
app.post('/books/getTotalPrice', (req, res) => {
    const books = req.body;
    const totalPrice = (0, exercise_1.getTotalBookPrice)(books);
    res.json({ totalPrice });
});
// Route to get average price of all books
app.post('/books/getAveragePrice', (req, res) => {
    const books = req.body;
    const averagePrice = (0, exercise_1.getAverageBookPrice)(books);
    res.json({ averagePrice });
});
// Route to get the maximum price among all books
app.post('/books/getMaxPrice', (req, res) => {
    const books = req.body;
    const maxPrice = (0, exercise_1.getMaxBookPrice)(books);
    res.json({ maxPrice });
});
// Route to get the minimum price among all books
app.post('/books/getMinPrice', (req, res) => {
    const books = req.body;
    const minPrice = (0, exercise_1.getMinBookPrice)(books);
    res.json({ minPrice });
});
// Route to filter books by author
app.post('/books/filterByAuthor', (req, res) => {
    const { author } = req.body;
    const books = req.body.books;
    const filteredBooks = (0, exercise_1.filterBooksByAuthor)(books, author);
    res.json(filteredBooks);
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=server.js.map