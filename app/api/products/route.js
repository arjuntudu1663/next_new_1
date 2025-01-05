import mongoose from "mongoose"
import createConnection from "@/lib/mongoconnect"
import People from "@/models/People"



export async function GET(Request){
    
  
         try{
            const list = await People.find()
            console.log(list)

            return new Response(JSON.stringify("connection done"))

         }catch(e){
            console.log(e)
            return new Response(JSON.stringify("error from mongodb connection"))
         }


      

    

}