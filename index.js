const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser")
const path = require("path")
require("dotenv").config()


const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles:true
}));

//Routes for creation
app.use("/user", require("./routes/userRouter"))
app.use("/api", require("./routes/pokemonRouter"))


//MongoDB connection code
const URI = process.env.MONGODB_URL
try {
     mongoose.connect(URI , {
     useNewUrlParser:true,
     useUnifiedTopology:true
    });
    console.log(`Connection Success`);
   } catch (error) {
     console.log(error);
   }



//For production code to serve client build
if (process.env.NODE_ENV=== 'production') {
    app.use(express.static('client/build'));
    app.get('*',(req,res) => {
        res.sendFile(path.join(__dirname , 'client' , 'build' , 'index.html'))
    })
}


//PORT Connection
const PORT = process.env.PORT||5000;

app.listen(PORT,()=>{
    console.log('Server is running on port', PORT);
})