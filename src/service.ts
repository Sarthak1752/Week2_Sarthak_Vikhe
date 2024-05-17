import pool from './pgConfig';

// Function to verify table existence and create it if absent
let isTableInitialized = false;
export const ensureTableExists = async () => {
  
  // Skip check if already done
  if (isTableInitialized) return;

  const verifyTableQuery = `
    SELECT to_regclass('public.orders') IS NOT NULL AS table_exists;
  `;

  const { rows } = await pool.query(verifyTableQuery);
  const doesTableExist = rows[0].table_exists;

  if (doesTableExist) {
    console.log('Table "orders" already exists.');
  } else {
    const createTableSQL = `
      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        orderID VARCHAR(255) NOT NULL
      );
    `;
    await pool.query(createTableSQL);
    console.log('Table "orders" has been created.');
  }

  isTableInitialized = true;
};

// Function to filter items based on specified criteria
export const filterOrders = (orders: any[]): any[] => {
  if (!Array.isArray(orders)) {
    throw new Error('Invalid input: orders must be an array');
  }

  return orders.filter((order: any) => {
    const orderBlocks = order.OrderBlocks;

    return !orderBlocks.some((block: any) => {
      const lineNo = block.lineNo;
      if (Array.isArray(lineNo)) {
        return lineNo.some((no: any) => no % 3 === 0);
      } else {
        return lineNo % 3 === 0;
      }
    });
  });
};

// Function to insert order IDs into the "orders" table
export const saveOrders = async (orders: any[]): Promise<void> => {
  if (!Array.isArray(orders)) {
    throw new Error('Invalid input: orders must be an array');
  }

  for (const order of orders) {
    await pool.query('INSERT INTO orders (orderID) VALUES ($1)', [order.orderID]);
  }
};

// Define an array of student objects
const studentList = [
  { name: "Alice", age: 20, grade: 75 },
  { name: "Bob", age: 22, grade: 85 },
  { name: "Charlie", age: 21, grade: 60 },
  { name: "David", age: 19, grade: 45 },
  { name: "Eve", age: 20, grade: 90 }
];

// Function to filter students who have passed (grade >= 50)
export const getPassingStudents = (): { name: string; age: number; grade: number }[] => {
  return studentList.filter(student => student.grade >= 50);
};

// Function to retrieve names of all students
export const listStudentNames = (): string[] => {
  return studentList.map(student => student.name);
};

// Function to sort students by grade in ascending order
export const sortStudentsByGrades = (): { name: string; age: number; grade: number }[] => {
  return studentList.slice().sort((a, b) => a.grade - b.grade);
};

// Function to calculate the average age of the students
export const calculateAverageAge = (): number => {
  const totalAge = studentList.reduce((sum, student) => sum + student.age, 0);
  return totalAge / studentList.length;
};