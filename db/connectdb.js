const mongoose = require('mongoose');

con = "mongodb+srv://kushagra08:ABcd0002.@cluster0.mr4htie.mongodb.net/Admission_Portal?retryWrites=true&w=majority"


const connectDB =()=>{
    
    return mongoose.connect(con)
    .then(()=>{
        console.log('Connection successful')
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports = connectDB