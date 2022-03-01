const config = require('../config.json')
const stripe = require('stripe')(`${config.stripe_secret_key}`)

var express = require('express');
var mysql = require('mysql2');
var app = express();
const cors = require('cors')
app.use(express.static('public'));
app.use(express.urlencoded());
app.use(express.json());

var shortid = require('shortid')
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
    const username= req.body.username;
    const password=req.body.password;

    const sqlquery=`SELECT password,role FROM login where username='${username}'`;
    con.query(sqlquery, function (err, result) {
       if (err) 
          throw err;
          if(result.length){
              if(result[0].password==password){
                  res.send({
                     role:result[0].role,
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
      res.send({
         students:result[0][0]['count(*)'],
         subjects: result[1][0]['count(*)']
      });
   })
})
  

app.post('/add/subject',(req,res)=>{
   const sql = `insert into subject_details(subcode,subname) values('${req.body.subcode}','${req.body.subname}')`
   con.query(sql, (err, result) => {
      if (err){
         if(err.errno == 1062){
            res.send('Duplicate Subcode exists');
         }else
            res.send('Please try again after some time')
      }
      else
         res.send('Successfully Added');
   })
})

app.post('/add/student', (req, res) => {
   const sql = `insert into student_data(fname ,midname,lname,age,dob, email, address,subjects) values('${req.body.fname}','${req.body.midname}','${req.body.lname}','${parseInt(req.body.age)}',STR_TO_DATE('${req.body.dob}','%d-%m-%Y'),'${req.body.email}','${req.body.address}','${req.body.subjects}')`
   con.query(sql, (err, result) => {
      if (err) {
         res.send('Duplicate Entry for email');
      }
      else{
         let dob = req.body.dob;
         dob = dob.replaceAll('-', '')
         const query = `insert into login values('${req.body.email}','${dob}','user')`;
         con.query(query,(err,result) => {
            if(err){
               console.log(err);
               res.send('Duplicate Entry for email : login');
            }else{
               res.send('Successfully Added')
            }
         });

      }
   })
})

app.get('/list/student/:id',(req,res)=>{
   const sql = `select * from student_data where rollNumber = ${req.params.id}`
   con.query(sql,(err,result)=>{
      if(err){
         res.send('Try Again after some time')
      }else{
         res.send(result[0])
      }
   });
})

app.post(`/edit/student/:id`,(req,res)=>{
   const sql = `UPDATE student_data SET fname='${req.body.fname}',midname='${req.body.midname || ''}',lname='${req.body.lname}',age=${req.body.age},dob=STR_TO_DATE('${req.body.dob}','%d-%m-%Y'), email='${req.body.email}', address='${req.body.address}',subjects='${req.body.subjects}' where rollNumber=${req.params.id}`
   con.query(sql,(err,result)=>{
      if(err){
         res.send('Please Try Again After some time')
      }else{
         res.send('Updated')
      }
   })
})


app.get('/list/subject/:id', (req, res) => {
   const sql = `select * from subject_details where subcode = ${req.params.id}`
   con.query(sql, (err, result) => {
      if (err) {
         res.send('Try Again after some time')
      } else {
         res.send(result[0])
      }
   });
})

app.post(`/edit/subject/:id`, (req, res) => {
   const sql = `UPDATE subject_details SET subname='${req.body.subname}' where subcode=${req.params.id}`
   con.query(sql, (err, result) => {
      if (err) {
         res.send('Please Try Again After some time')
      } else {
         res.send('Updated')
      }
   })
})

app.post(`/delete/student/:id`,(req,res)=>{
   const sql = `DELETE from student_data where rollNumber = ${req.params.id}`;
   con.query(sql, (err, result) => {
      if (err) {
         console.log(err);
         res.send('Please Try Again After some time')
      } else {
         res.send('Deleted')
      }
   })
});


app.post(`/delete/subject/:id`, (req, res) => {
   const sql = `DELETE from subject_details where subcode = ${req.params.id}`;
   con.query(sql, (err, result) => {
      if (err) {
         res.send('Please Try Again After some time');
      } else {
         res.send('Deleted');
      }
   })
});


app.post('/add/dues',(req,res)=>{
   let id = shortid.generate();
   const sql = `insert into dues(due_id,stud_id,due_desc,due_payment,is_completed) values('${id}',${req.body.id},'${req.body.reason}',${req.body.amount},false)`;
   con.query(sql, (err, result) => {
      if (err) {
         if (err.errno == 1062) {
            res.send('Duplicate Dues exists for this Student');
         } else
            res.send('Please try again after some time')
      }
      else
         res.send('Successfully Added');
   })
})

app.get('/list/dues/:id',(req,res)=>{
   const sql = `select * from dues where stud_id = ${req.params.id}`
   con.query(sql, (err, result) => {
      if (err) {
         throw err;
         res.send('Try Again after some time')
      } else {
         res.send(result)
      }
   });
});

app.post('/complete/due/:id',(req,res)=>{
   const sql = `UPDATE dues SET is_completed=${true} where due_id = '${req.params.id}'`;
   con.query(sql, (err, result) => {
      if (err) {
         throw err;
         res.send('Please Try Again After some time')
      } else {
         res.send('Updated')
      }
   })
})

app.post('/incomplete/due/:id', (req, res) => {
   const sql = `UPDATE dues SET is_completed=${false} where due_id = '${req.params.id}'`;
   con.query(sql, (err, result) => {
      if (err) {
         throw err;
         res.send('Please Try Again After some time')
      } else {
         res.send('Updated')
      }
   })
})

app.post('/delete/due/:id', (req, res) => {
   const sql = `DELETE from dues where due_id = '${req.params.id}'`;
   con.query(sql, (err, result) => {
      if (err) {
         res.send('Please Try Again After some time')
      } else {
         res.send('Deleted')
      }
   })
})

app.get('/list/due/:id', (req, res) => {
   const sql = `select * from dues where due_id = '${req.params.id}'`
   con.query(sql, (err, result) => {
      if (err) {
         throw err;
         res.send('Try Again after some time')
      } else {
         res.send(result[0])
      }
   });
});

app.post(`/update/dues/:id`, (req, res) => {
   const sql = `UPDATE dues SET due_payment=${req.body.amount},due_desc='${req.body.reason}' where due_id='${req.params.id}'`
   con.query(sql, (err, result) => {
      if (err) {
         res.send('Please Try Again After some time')
      } else {
         res.send('Updated')
      }
   })
})


app.post(`/add/marks`,(req,res)=>{

   const sql = `INSERT into marks(stud_id,subcode,marks) values(${req.body.rollNumber},'${req.body.subcode}',${req.body.marks})`;
   con.query(sql, (err, result) => {
      if (err) {
         res.send('Please Try Again After some time')
      } else {
         res.send('Inserted')
      }
   })
})

app.get('/list/marks/:id',(req,res)=>{
   const sql = `select * from marks where stud_id = ${req.params.id};`;
   con.query(sql, (err, result) => {
      if (err) {
         throw err;
         res.send('Try Again after some time')
      } else {
         res.send(result)
      }
   })
})

app.post('/edit/marks',(req,res)=>{

   const sql = `update marks set marks=${req.body.marks} where stud_id=${req.body.rollNumber} and subcode='${req.body.subcode}';`

   con.query(sql, (err, result) => {
      if (err) {
         throw err;
         res.send('Try Again after some time')
      } else {
         res.send('Marks Updated');
      }
   });
})

app.post('/delete/marks', (req, res) => {

   const sql = `delete from marks where stud_id=${req.body.rollNumber} and subcode='${req.body.subcode}';`

   con.query(sql, (err, result) => {
      if (err) {
         throw err;
         res.send('Try Again after some time')
      } else {
         res.send('Marks Deleted');
      }
   });
})

app.get('/view/student/:email',(req,res)=>{
   console.log(req.params.email);
   const sql = `select * from student_data where email='${req.params.email}'`;

   con.query(sql, (err, result) => {
      if (err) {
         throw err;
         res.send('Try Again after some time')
      } else {
         res.send(result[0]);
      }
   });
});

app.post('/create-checkout-session', async (req, res) => {
   console.log(`received request`);
   const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{
         price_data: {
            currency: "inr",
            product_data: {
               name: "product",
            },
            unit_amount: 100000,
         },
         quantity: 1,
      },],
      mode: "payment",
      success_url: "https://www.google.com",
      cancel_url: req.body.cancel,
   });

   res.send(session.url);
});


app.listen(port, function () {   
    console.log(`Student app listening at ${port}`);
 })
 