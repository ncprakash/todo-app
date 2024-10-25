// const express = require("express");
// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const app = express();
// const JWT_SECRET = "sadasdasdd@11";
// const port = 3000;

// // Database connection
// mongoose.connect("mongodb+srv://ncprakash121:ncprakash121@cluster0.wtxd8.mongodb.net/todo-prkash-222")
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("Connection error", err));

// // Import models
// const { UserModel, TodoModel } = require("./db");

// // Middleware
// app.use(express.json());

// // Signup route
// app.post("/signup", async (req, res) => {
//   const { email, password, name } = req.body;
//   try {
//     const user = await UserModel.create({ email, password, name });
//     res.status(201).json({ message: "User created successfully", user });
//   } catch (error) {
//     res.status(500).json({ message: "Error creating user", error });
//   }
// });

// // Signin route
// app.post("/signin", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await UserModel.findOne({ email, password });
//     console.log(user);
//     if (user) {
//       const token = jwt.sign({ id: user._id }, JWT_SECRET);
//       res.json({ token });
//     } else {
//       res.status(403).json({ message: "Incorrect credentials" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error signing in", error });
//   }
// });

// // Placeholder routes for `/todo` and `/todos`
// app.post("/todo", (req, res) => {
//   res.send("Todo endpoint not implemented yet");
// });

// app.post("/todos", (req, res) => {
//   res.send("Todos endpoint not implemented yet");
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });



// const express=require("express")
// const app=express();
// const port =3006;


// app.set("views", __dirname + "/views");
// app.use(express.static("public"));
// app.set("view engine", "ejs");

// app.get("/",(req,res)=>{
//     res.render('homepage.ejs')
// })
// app.listen(port,()=>{
//     console.log(`port is listening at ${port}`)
// })

// const express = require("express");

// const app = express();
// const port = 3006;

// // Set the views directory

// // Set the view engine to EJS


// // Serve static files from the "public" directory
// app.use(express.static("public"));

// // Define the route for the homepage
// app.get("/", (req, res) => {
//     res.render('homepage.ejs', );
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Port is listening at ${port}`);
// });














const express = require("express");

const bcrypt= require("bcrypt");
const pg=require("pg");
const path = require("path"); // Make sure to require 'path' module
const app = express();
const port = 3000;
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "todousers",
    password: "prakash@121",
    port: 5432,
  });
  db.connect();





app.use(express.urlencoded({extended:true}));


app.set('views', path.join(__dirname, 'views'));



app.set("view engine", "ejs");

app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render('index'); 
});

// Define the route for the sign-in page
app.get("/signin", (req, res) => {
    res.render("sign"); 
});
app.get("/login", async(req, res) => {
    res.render("login"); 

   
});
app.get("/todo",(req,res)=>{
    res.render("todo");

    
})



app.post('/login', async (req, res) => {
    const { username1, password1 } = req.body;

    try {
       
        const userResult = await db.query("SELECT * FROM users WHERE username = $1", [username1]);

     
        if (userResult.rows.length === 0) {
            return res.status(404).send('User not found');
        }

       
        const user = userResult.rows[0];


        const isMatch = await bcrypt.compare(password1, user.password);
        if (isMatch) {
            req.session.personid=user.personid;
            console.log('Login successful');
            return res.redirect('/todo'); 
        } else {
            return res.status(401).send('Incorrect password');
        }
    } catch (err) {
        console.error('Error checking user:', err);
        return res.status(500).send('Server error');
    }
});


app.post("/sigin", async (req,res)=>{
    try{
    const username=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    
    console.log(username);
 
  
    const hashedPassword= await bcrypt.hash(password,5);
    const result = await db.query(
        "INSERT INTO users (username, password ) VALUES ($1, $2)",
        [username , hashedPassword] );
    console.log(hashedPassword);
    console.log(password);


    res.redirect("/todo");
} catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).send("An error occurred while signing in.");
}



})

  
   
    

    






// Start the server
app.listen(port, () => {
    console.log(`Port is listening at ${port}`);
});


