const express = require('express');

const cors = require('cors');

const fs = require('fs');

const path = require('path');



const app = express();

const PORT = 1234;



app.use(cors());

app.use(express.json());





const studentsFilePath = path.join(__dirname, 'students.json');



let students = [];





function loadStudentsData() {

  try {



    const data = fs.readFileSync(studentsFilePath, 'utf8');

    students = JSON.parse(data);

    console.log('✅ Students data loaded successfully from students.json');

  } catch (err) {

    if (err.code === 'ENOENT') {

      console.warn('⚠️ students.json not found. Creating a new empty file.');

      students = [];

    } else {

      console.error('❌ Error loading students data from students.json:', err);

     

      process.exit(1);

    }

  }

}





function saveStudentsData() {

  try {



    fs.writeFileSync(studentsFilePath, JSON.stringify(students, null, 2));

    console.log('💾 Students data saved successfully to students.json');

  } catch (err) {

    console.error('❌ Error saving students data to students.json:', err);

  }

}





loadStudentsData();



app.get('/api/Student/GetStudents', (req, res) => {

  res.json(students);

});





app.post('/api/Student/GetStudents', (req, res) => {

  const newStudent = req.body;

 

  newStudent.id = students.length ? Math.max(...students.map(s => s.id)) + 1 : 1;

  students.push(newStudent);

  saveStudentsData();

  res.status(201).json(newStudent);

});



app.put('/api/Student/GetStudents/:id', (req, res) => {

  const id = parseInt(req.params.id);

  const index = students.findIndex(s => s.id === id);



  if (index !== -1) {

    students[index] = { ...students[index], ...req.body };

    saveStudentsData();

    res.json(students[index]);

  } else {

    res.status(404).json({ message: 'Student not found' });

  }

});





app.delete('/api/Student/GetStudents/:id', (req, res) => {

  const id = parseInt(req.params.id);

  const index = students.findIndex(s => s.id === id);

  if (index !== -1) {

    students.splice(index, 1);

    saveStudentsData();

    res.sendStatus(204);

  } else {

    res.status(404).json({ message: 'Student not found' });

  }

});



// Start the Express server

app.listen(PORT, () => {

  console.log(`✅ Server running at http://localhost:${PORT}`);

});