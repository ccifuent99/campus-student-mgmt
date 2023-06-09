const express = require('express');
const path = require('path');
const app = express();
const { Student, Campus, seed, conn } = require('../src/db');

app.use(express.json());
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
}); 

app.get('/api/campuses', async(req,res,next)=>{
   Campus.findAll()
        .then( campuses => res.send(campuses))
        .catch(next);
});

app.get('/api/students', async(req,res,next)=>{
   Student.findAll()
        .then( students => res.send(students))
        .catch(next);
});

app.get('/api/students/:id', (req,res,next)=>{
  Student.findByPk(req.params.id)
    .then(student => res.send(student))
    .catch(next);
});

app.get('/api/campuses/:id', (req,res,next)=>{
  Campus.findByPk(req.params.id)
    .then(campus => res.send(campus))
    .catch(next);
});

app.post('/api/students', (req,res,next)=>{
  Student.create(req.body) 
    .then(student => res.status(201).send(student))
    .catch(next);
});

app.post('/api/campuses', (req,res,next)=>{
  Campus.create(req.body) 
    .then(campus => res.status(201).send(campus))
    .catch(next);
});

app.put('/api/campuses/:id', (req,res,next)=>{
  Campus.findByPk(req.params.id)
    .then(campus => campus.update(req.body))
    .then(campus => res.send(campus))
    .catch(next);
});

app.put('/api/students/:id', (req,res,next)=>{
  Student.findByPk(req.params.id)
    .then(student => student.update(req.body))
    .then(student => res.send(student))
    .catch(next);
});

app.delete('/api/students/:id', async(req,res,next)=>{
  Student.findByPk(req.params.id)
        .then(student => student.destroy())
        .then(res.sendStatus(204))
        .catch(next);
});

app.delete('/api/campuses/:id', async(req,res,next)=>{
  Campus.findByPk(req.params.id)
        .then(campus => campus.destroy())
        .then(res.sendStatus(204))
        .catch(next);
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send(err);
});



module.exports = app;