const config = require('../config.json')

var express = require('express');
var mysql = require('mysql2');
var app = express();
const cors = require('cors')
app.use(express.static('public'));
app.use(express.urlencoded());
app.use(express.json());
var port = 5000


app.use(cors())
var con = mysql.createConnection({
    host: "localhost",
    user: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database:config.DB_NAME,
   multipleStatements: true
  });

  con.connect((err)=>{
    if(err)
       throw err;
    console.log('Connected to MySQL client');
 })

 app.post('/login',(req,res)=>{
    console.log(req.body);
    const username= req.body.username;
    const password=req.body.password;

    const sqlquery=`SELECT password FROM login where username='${username}'`;
    //console.log(sqlquery);
    con.query(sqlquery, function (err, result) {
       if (err) 
          throw err;
          if(result.length)
          {
             // console.log(result ,result[0].password);
              if(result[0].password==password)
              {
                  res.send({
                     statusCode:200
                  })
              }
              else{
                  res.send({
                     statusCode:401,
                     data:"Password is wrong"
                  })
              }
          }
          else{
            res.send({
               statusCode:404,
               data:"No Existing User with specified mail present"
            });
          }
          
       //console.log(result);
     });
    
 });


app.get('/list/students',(req,res)=>{

   const sql = `select * from student_data ;`;
   con.query(sql,(err,result)=>{
      res.send(result);
   })
});

app.get('/list/subjects', (req, res) => {

   const sql = `select * from subject_details ;`;
   con.query(sql, (err, result) => {
      res.send(result);
   })
});

app.get('/count',(req,res)=>{
   const sql = `select count(*) from student_data ; select count(*) from subject_details;`;
   con.query(sql, (err, result) => {
      if(err)
         throw err
      console.log(result);
      res.send({
         students:result[0][0]['count(*)'],
         subjects: result[1][0]['count(*)']
      });
   })
})
  

app.post('/add/subject',(req,res)=>{
   console.log(req.body);
   // res.send('done');
   const sql = `insert into subject_details(subcode,subname) values('${req.body.subcode}','${req.body.subname}')`
   con.query(sql, (err, result) => {
      if (err){
         console.log(err);
         res.send('Please try again after some time')
      }
      else
         res.send('Successfully Added');
   })
})

app.post('/add/student', (req, res) => {
   console.log(req.body);
   // res.send('done');
   const sql = `insert into student_data(fname ,midname,lname,age,dob, email, address) values('${req.body.fname}','${req.body.midname}','${req.body.lname}','${parseInt(req.body.age)}',STR_TO_DATE('${req.body.dob}','%d-%m-%Y'),'${req.body.email}','${req.body.add}')`
   con.query(sql, (err, result) => {
      if (err) {
         console.log(err);
         res.send('Please try again after some time')
      }
      else
         res.send('Successfully Added');
   })
})



app.listen(port, function () {   
    console.log(`Student app listening at ${port}`);
 })
 

   
 