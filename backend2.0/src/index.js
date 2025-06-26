import dotenv from "dotenv"
import DBconnect from "./db/index.js"
import {app} from "./app.js"

dotenv.config({
  path: './.env'
})



DBconnect()
.then(()=>{
    app.on("error",(error)=>{
      console.log("error",error);
      process.exit(1)
    })
    app.get('/', (req, res) => {
       res.send('Hello World!')
    })
   
  
    app.listen(process.env.PORT || 3000,()=>{
      console.log(`server started at ${process.env.PORT}`)
    })
})
.catch((error)=>{
  console.log("MongoDb Connection Failed!!",error)
})