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
const express_1 = __importDefault(require("express"));
const service_1 = require("./service");
const pgConfig_1 = __importDefault(require("./pgConfig"));
const PORT = 5000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send("Welcome! This is the assignment for week 2.");
});
app.post('/data/process', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body.data;
    try {
        // Filter the incoming data
        const filteredData = (0, service_1.filterOrders)(data);
        // Ensure that the necessary table exists in the database
        yield (0, service_1.ensureTableExists)();
        // Store the filtered data into the database
        yield (0, service_1.saveOrders)(filteredData);
        res.status(201).json({ message: 'Filtered data has been processed and stored in the database', filteredData });
    }
    catch (error) {
        res.status(500).json({ message: 'An error occurred while processing the data', error });
    }
}));
// Endpoint to fetch the list of students who have passed
app.get('/students/passed', (req, res) => {
    const passedStudents = (0, service_1.getPassingStudents)();
    res.json(passedStudents);
});
// Endpoint to retrieve the names of all students
app.get('/students/names', (req, res) => {
    const names = (0, service_1.listStudentNames)();
    res.json(names);
});
// Endpoint to sort students by their grades
app.get('/students/sortedByGrade', (req, res) => {
    const sortedStudents = (0, service_1.sortStudentsByGrades)();
    res.json(sortedStudents);
});
// Endpoint to calculate the average age of students
app.get('/students/averageAge', (req, res) => {
    const averageAge = (0, service_1.calculateAverageAge)();
    res.json({ averageAge });
});
// Display a message upon successful database connection
pgConfig_1.default.on('connect', () => {
    console.log('Successfully connected to the database.');
});
app.listen(PORT, () => {
    console.log(`Server is running and listening on port ${PORT}.`);
});
//# sourceMappingURL=app.js.map