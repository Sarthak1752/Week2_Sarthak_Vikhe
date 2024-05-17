// Function to filter books costing more than $15
export const filterExpensiveBooks = (books: { id: number; title: string; author: string; price: number }[]): { id: number; title: string; author: string; price: number }[] => {
    return books.filter(book => book.price > 15);
  };
  
  // Function to get book titles
  export const getBookTitles = (books: { id: number; title: string; author: string; price: number }[]): string[] => {
    return books.map(book => book.title);
  };
  
  // Function to sort books by price in descending order
  export const sortBooksByPrice = (books: { id: number; title: string; author: string; price: number }[]): { id: number; title: string; author: string; price: number }[] => {
    return books.slice().sort((a, b) => b.price - a.price);
  };
  
  // Function to calculate total price of all books
  export const getTotalBookPrice = (books: { id: number; title: string; author: string; price: number }[]): number => {
    return books.reduce((total, book) => total + book.price, 0);
  };
  
  // Function to calculate average price of all books
  export const getAverageBookPrice = (books: { id: number; title: string; author: string; price: number }[]): number => {
    const total = getTotalBookPrice(books);
    return total / books.length;
  };
  
  // Function to find maximum price among all books
  export const getMaxBookPrice = (books: { id: number; title: string; author: string; price: number }[]): number => {
    return Math.max(...books.map(book => book.price));
  };
  
  // Function to find minimum price among all books
  export const getMinBookPrice = (books: { id: number; title: string; author: string; price: number }[]): number => {
    return Math.min(...books.map(book => book.price));
  };
  
  // Function to filter books by author
  export const filterBooksByAuthor = (books: { id: number; title: string; author: string; price: number }[], author: string): { id: number; title: string; author: string; price: number }[] => {
    return books.filter(book => book.author.toLowerCase().includes(author.toLowerCase()));
  };