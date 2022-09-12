const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/InnoQ_On_Tech', {useNewUrlParser: true, useUnifiedTopology: true})

const userSchema=new mongoose.Schema({
    email:String,
})


const User=mongoose.model('User',userSchema);
module.exports=User;