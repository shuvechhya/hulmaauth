require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const morgan=require("morgan");
const dotenv=require("dotenv");

//utlis
const AppError=require('./utlis/apperror');
const globalErrorController=require('./controllers/globalerrorcontroller');


const app = express()

dotenv.config({path:"./.env"})


app.use(express.json())

if(process.env.NODE_ENV="development"){
app.use(morgan("dev"));
}

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
//routes
const userRoutes=require("./routes/userroutes");

app.use('/api/v1/user',userRoutes);



app.use('/api/hulma',workoutRoutes)

//handle  unhandled error
app.all("*",(req,res,next)=>{
  

   // const err=new Error('cant find the route ');
    //err.statusCode=404;
    //err.status="fail";

   // next(err);

   next(new AppError('cant find routes',404));
});


//global error handler
app.use(globalErrorController);



mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGO_URI).then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connect to db & listening on port', process.env.PORT)
        })
    }).catch((error) => {
    console.log(error)
    })

