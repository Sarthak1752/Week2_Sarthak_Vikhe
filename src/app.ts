import express, { Request, Response } from 'express';
import { filterOrders, saveOrders, ensureTableExists, getPassingStudents, listStudentNames , sortStudentsByGrades, calculateAverageAge} from './service';
import pool from './pgConfig';

const PORT: number = 5000;
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Welcome! This is the assignment for week 2.");
});

app.post('/data/process', async (req: Request, res: Response) => {
  const data: any = req.body.items;

  try {
    // Filter the incoming data
    const filteredData= filterOrders(data);

    // Ensure that the necessary table exists in the database
    await ensureTableExists();

    // Store the filtered data into the database
    await saveOrders(filteredData);

    res.status(201).json({ message: 'Filtered data has been processed and stored in the database', filteredData });
  } catch (error: any) {
    res.status(500).json({ message: 'An error occurred while processing the data', error });
  }
});

// Endpoint to fetch the list of students who have passed
app.get('/students/passed', (req: Request, res: Response) => {
  const passedStudents = getPassingStudents();
  res.json(passedStudents);
});

// Endpoint to retrieve the names of all students
app.get('/students/names', (req: Request, res: Response) => {
  const names = listStudentNames();
  res.json(names);
});

// Endpoint to sort students by their grades
app.get('/students/sortedByGrade', (req: Request, res: Response) => {
  const sortedStudents = sortStudentsByGrades();
  res.json(sortedStudents);
});

// Endpoint to calculate the average age of students
app.get('/students/averageAge', (req: Request, res: Response) => {
  const averageAge = calculateAverageAge();
  res.json({ averageAge });
});

// Display a message upon successful database connection
pool.on('connect', () => {
  console.log('Successfully connected to the database.');
});

app.listen(PORT, () => {
  console.log(`Server is running and listening on port ${PORT}.`);
});