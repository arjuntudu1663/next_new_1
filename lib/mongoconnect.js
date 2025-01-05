import mongoose from "mongoose"

const createConnection = async() => {
    
    try{
        mongoose.connect("mongodb+srv://arjuntudu9163:Wbem1tWDmFAuVPZD@cluster0.cq6wv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",

            {
                useNewUrlParser:true,
                useUndefinedTopology:true
            }


        )
    }catch(e){
        if(e){
            console.log(e)
        }
    }

}

export default createConnection;