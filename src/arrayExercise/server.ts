import express from 'express';
import {
  filterExpensiveBooks,
  getBookTitles,
  sortBooksByPrice,
  getTotalBookPrice,
  getAverageBookPrice,
  getMaxBookPrice,
  getMinBookPrice,
  filterBooksByAuthor
} from './exercise';

const app = express();
app.use(express.json());

const port = 5000;

// Route to filter expensive books
app.post('/books/filterExpensive', (req, res) => {
  const books = req.body;
  const expensiveBooks = filterExpensiveBooks(books);
  res.json(expensiveBooks);
});

// Route to get book titles
app.post('/books/getBookTitles', (req, res) => {
  const books = req.body;
  const bookTitles = getBookTitles(books);
  res.json(bookTitles);
});

// Route to sort books by price
app.post('/books/sortByPrice', (req, res) => {
  const books = req.body;
  const sortedBooks = sortBooksByPrice(books);
  res.json(sortedBooks);
});

// Route to get total price of all books
app.post('/books/getTotalPrice', (req, res) => {
  const books = req.body;
  const totalPrice = getTotalBookPrice(books);
  res.json({ totalPrice });
});

// Route to get average price of all books
app.post('/books/getAveragePrice', (req, res) => {
  const books = req.body;
  const averagePrice = getAverageBookPrice(books);
  res.json({ averagePrice });
});

// Route to get the maximum price among all books
app.post('/books/getMaxPrice', (req, res) => {
  const books = req.body;
  const maxPrice = getMaxBookPrice(books);
  res.json({ maxPrice });
});

// Route to get the minimum price among all books
app.post('/books/getMinPrice', (req, res) => {
  const books = req.body;
  const minPrice = getMinBookPrice(books);
  res.json({ minPrice });
});

// Route to filter books by author
app.post('/books/filterByAuthor', (req, res) => {
  const { author } = req.body;
  const books = req.body.books;
  const filteredBooks = filterBooksByAuthor(books, author);
  res.json(filteredBooks);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

