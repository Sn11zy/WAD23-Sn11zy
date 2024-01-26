
const express = require('express');
const pool = require('./database');
const cors = require('cors')

const port = process.env.PORT || 3000;
const app = express();


app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(express.json());

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});


app.get('/api/rplrequests', async(req, res) => {
    try {
        console.log("A GET all request has arrived");
        const rplrequest = await pool.query(
            "SELECT * FROM rplrequest"
        );
        res.json(rplrequest.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post('/api/rplrequests', async(req,res) =>{
    try{
        console.log("A POST request has arrived");
        const form = req.body;
        const rplrequest = await pool.query(
            "INSERT INTO rplrequest (studentcode,coursename,coursecode,courseects,utcoursename,utcoursecode,utcourseects,decision) VALUES ($1,$2,$3,$4,$5,$6,$7,NULL)", [form.studentcode,form.coursename,form.coursecode,form.courseects,form.utcoursename,form.utcoursecode,form.utcourseects]
        );
        res.json(rplrequest)
    } catch (e){
        console.error(e.message);
    }
});
