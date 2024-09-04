require('dotenv').config();
const mongoose=require('mongoose')
const url=process.env.MONGODB_URI
mongoose.set('strictQuery',false)
console.log('connecting to url:',url)
mongoose.connect(url)
.then(result=>{
    console.log('connected successfully!')
})
.catch(error=>{
    console.log('failed to connect',error.message)
})

const schema=new mongoose.Schema({
    name:String,
    num:Number,
})

schema.set('toJSON',{
    transform: (document,returnedObject)=>{
        returnedObject.id=returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports=mongoose.model('Person',schema)