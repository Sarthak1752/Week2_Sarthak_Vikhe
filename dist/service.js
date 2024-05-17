"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateAverageAge = exports.sortStudentsByGrades = exports.listStudentNames = exports.getPassingStudents = exports.saveOrders = exports.filterOrders = exports.ensureTableExists = void 0;
const pgConfig_1 = __importDefault(require("./pgConfig"));
// Function to verify table existence and create it if absent
let isTableInitialized = false;
const ensureTableExists = () => __awaiter(void 0, void 0, void 0, function* () {
    // Skip check if already done
    if (isTableInitialized)
        return;
    const verifyTableQuery = `
    SELECT to_regclass('public.orders') IS NOT NULL AS table_exists;
  `;
    const { rows } = yield pgConfig_1.default.query(verifyTableQuery);
    const doesTableExist = rows[0].table_exists;
    if (doesTableExist) {
        console.log('Table "orders" already exists.');
    }
    else {
        const createTableSQL = `
      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        orderID VARCHAR(255) NOT NULL
      );
    `;
        yield pgConfig_1.default.query(createTableSQL);
        console.log('Table "orders" has been created.');
    }
    isTableInitialized = true;
});
exports.ensureTableExists = ensureTableExists;
// Function to filter items based on specified criteria
const filterOrders = (orders) => {
    if (!Array.isArray(orders)) {
        throw new Error('Invalid input: orders must be an array');
    }
    return orders.filter((order) => {
        const orderBlocks = order.OrderBlocks;
        return !orderBlocks.some((block) => {
            const lineNo = block.lineNo;
            if (Array.isArray(lineNo)) {
                return lineNo.some((no) => no % 3 === 0);
            }
            else {
                return lineNo % 3 === 0;
            }
        });
    });
};
exports.filterOrders = filterOrders;
// Function to insert order IDs into the "orders" table
const saveOrders = (orders) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Array.isArray(orders)) {
        throw new Error('Invalid input: orders must be an array');
    }
    for (const order of orders) {
        yield pgConfig_1.default.query('INSERT INTO orders (orderID) VALUES ($1)', [order.orderID]);
    }
});
exports.saveOrders = saveOrders;
// Define an array of student objects
const studentList = [
    { name: "Alice", age: 20, grade: 75 },
    { name: "Bob", age: 22, grade: 85 },
    { name: "Charlie", age: 21, grade: 60 },
    { name: "David", age: 19, grade: 45 },
    { name: "Eve", age: 20, grade: 90 }
];
// Function to filter students who have passed (grade >= 50)
const getPassingStudents = () => {
    return studentList.filter(student => student.grade >= 50);
};
exports.getPassingStudents = getPassingStudents;
// Function to retrieve names of all students
const listStudentNames = () => {
    return studentList.map(student => student.name);
};
exports.listStudentNames = listStudentNames;
// Function to sort students by grade in ascending order
const sortStudentsByGrades = () => {
    return studentList.slice().sort((a, b) => a.grade - b.grade);
};
exports.sortStudentsByGrades = sortStudentsByGrades;
// Function to calculate the average age of the students
const calculateAverageAge = () => {
    const totalAge = studentList.reduce((sum, student) => sum + student.age, 0);
    return totalAge / studentList.length;
};
exports.calculateAverageAge = calculateAverageAge;
//# sourceMappingURL=service.js.map