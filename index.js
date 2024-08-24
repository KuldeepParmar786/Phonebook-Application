const express=require('express')
const app=express()
const morgan=require('morgan')
const cors=require('cors')
let persons=[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
  ]
  app.use(express.static('dist'))
  app.use(cors())
  app.use(express.json())
  app.use(morgan('data'))
  morgan.token('data',(req,res)=>{return req.body})
const md=(request,response,next)=>{
   console.log('Method:',request.method)
   console.log('Path:',request.path)
   console.log('Body:',request.body)
   next()
}
 app.use(md)
app.get('/phonebook/persons',(request,response)=>{
   response.json(persons)
})
app.get('/phonebook/persons/info',(request,response)=>{
    let lengt=persons.length;
    const time=new Date().toLocaleString('en-US',{
    weekday: 'long',      
    year: 'numeric',      
    month: 'long',        
    day: 'numeric',       
    hour: 'numeric',      
    minute: 'numeric',    
    second: 'numeric',
    timeZoneName: 'short' 
    })
    const resmessage=`<p>Phonebook has info for ${lengt} people
    <p>${time}</p>`
    response.send(resmessage)
})

app.get('/phonebook/persons/:id',(request,response)=>{
   const id=request.params.id
   const person=persons.find(person=>person.id===id)
  
   if(person){
    response.json(person)
   }
   else{
     response.status(404).end()
   }
})
app.delete('/phonebook/persons/:id',(request,response)=>{
   const id=request.params.id
   persons=persons.filter(person=>person.id!==id)
   response.status(204).end()
})
app.post('/phonebook/persons/',(request,response)=>{
    const body=request.body
    const generateId=()=>{

       return String(Math.floor(Math.random()*99))
    }
    const newPerson={
       name:body.name,
       number:body.number,
       id:generateId()
    }
    if(!body.name || !body.number){
       response.status(400).send({error:'Name and number are required'})
    }
    const per=persons.find(per=>per.name===newPerson.name)
    if(per){
       return response.status(409).send({error:'name must be unique'})
    }
    persons=persons.concat(newPerson)
    response.json(newPerson)
})
const PORT=3001
app.listen(PORT,()=>{
    console.log(`Server Running at Port ${PORT}`)
})