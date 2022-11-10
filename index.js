const express=require("express")
const cors=require('cors')
const port=process.env.PORT || 5000
const app=express()
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');



app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://process.env.DB_USER:process.env.DB_PASSWORD@cluster0.6kcflds.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    
        try{ 
         
          const serviceCollection=client.db("services").collection("servicescollection");
          
        
          const reviewsCollection=client.db("services").collection("reviewscollection")
         
          
          app.get("/fewservice",async(req,res)=>{
            const query={}
            const cursor=serviceCollection.find(query)
            const Allservices=await cursor.limit(3).toArray()
            res.send(Allservices)
          })
          

          app.get("/services",async(req,res)=>{
            const query={}
            const cursor=serviceCollection.find(query)
            const Allservices=await cursor.toArray()
            res.send(Allservices)
          }) 

        

         app.get("/services/:id",async(req,res)=>{
            const id=req.params.id
            console.log(req.params.id)
            const query={_id: ObjectId(id)}
           const cursor= await serviceCollection.findOne(query)
            res.send(cursor)

         })
        //adding more services=====done
         app.post("/addservices",async(req,res)=>{
             
            const addedservice=req.body
             const result=await serviceCollection.insertOne(addedservice)
            // console.log(req.body)
            res.send()


         })

         
         //.............Review api..................

         app.get("/allreviews",async(req,res)=>{
            const query={}
            const cursor=reviewsCollection.find(query)
            const allreviews=await cursor.toArray()
            res.send(allreviews)

         })

         //this is done..
         app.get("/reviews",async(req,res)=>{
            let query={}
            if(req.query.email){
                query={
                    email: req.query.email
                }
            }
            const cursor=reviewsCollection.find(query)
            const Reviews=await cursor.toArray()
            res.send(Reviews)


         })
       
         //tjis post is done..
         app.post("/singlereviews",async(req,res)=>{
            const review=req.body
           const result=await reviewsCollection.insertOne(review)
           res.send(review)
         })

         //delete an user review..

         app.delete("/deletereview/:id",async(req,res)=>{
            const id=req.params._id
            const query={_id: ObjectId(id)}
            const result= await reviewsCollection.deleteOne(query)
            // console.log("deleting the id",id)
            res.send(id)
          
         })

        
      }
      finally{

      }
    

  

}
run().catch(console.dir)

app.listen(port,()=>{
    console.log(port,"port")

})

//servicesdb
//HZHgos6YIy4owF6w
//services
//servicescollection

//reviews
//reviewscollection
