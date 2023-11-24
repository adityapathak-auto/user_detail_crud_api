const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const app = express();
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const {connection} = require("./connectDB");


let Port = process.env.port || 5009;

app.use(cors());
app.use(express.json());
router.use(cors());

app.use("/", router);

app.listen(Port, () => console.log("Server Running"));

const db = mysql.createConnection({
    host: process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    port:process.env.DB_PORT
});

db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
    } else {
      console.log('Connected to MySQL database');
    }
  });



//create

router.post('/create', (req, res) => {
    const formData = req.body;
  
    // Insert the form data into the MySQL database
    const sql = 'INSERT INTO user_details SET ?';
  
    db.query(sql, formData, (err, result) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('Data inserted successfully');
        res.status(200).send('Data inserted successfully');
      }
    });
  });

router.get("/getAll" , async (reuest,response)=>{

    // response.json("Hello")

    let sql = "SELECT * FROM user_details";

    

    db.query(sql, (err,data)=>{
        if(err) return response.json(err);
        return response.json(data);
    })

    
   
    
});

// Import necessary modules and configurations

// ... (existing code)

// Endpoint to update user data by ID
router.put('/update/:id', (req, res) => {
    const userId = req.params.id;
    const updatedData = req.body;
  
    // Update the user data in the MySQL database
    const sql = 'UPDATE user_details SET ? WHERE id = ?';
  
    db.query(sql, [updatedData, userId], (err, result) => {
      if (err) {
        console.error('Error updating data in MySQL:', err);
        res.status(500).send('Internal Server Error');
      } else {
        if (result.affectedRows > 0) {
          console.log('Data updated successfully');
          res.status(200).send('Data updated successfully');
        } else {
          console.log('User not found');
          res.status(404).send('User not found');
        }
      }
    });
  });
  


router.get('/getUser/:id', (req, res) => {
    const userId = req.params.id;
  
    
    const sql = 'SELECT * FROM user_details WHERE id = ?';
  
    db.query(sql, userId, (err, result) => {
      if (err) {
        console.error('Error retrieving user details from MySQL:', err);
        res.status(500).send('Internal Server Error');
      } else {
        if (result.length > 0) {
          console.log('User details retrieved successfully');
          res.status(200).json(result[0]);
        } else {
          console.log('User not found');
          res.status(404).send('User not found');
        }
      }
    });
  });



router.delete('/delete/:id', (req, res) => {
    const userId = req.params.id;
  
   
    const sql = 'DELETE FROM user_details WHERE id = ?';
  
    db.query(sql, userId, (err, result) => {
      if (err) {
        console.error('Error deleting user from MySQL:', err);
        res.status(500).send('Internal Server Error');
      } else {
        if (result.affectedRows > 0) {
          console.log('User deleted successfully');
          res.status(200).send('User deleted successfully');
        } else {
          console.log('User not found');
          res.status(404).send('User not found');
        }
      }
    });
  });
  
  




