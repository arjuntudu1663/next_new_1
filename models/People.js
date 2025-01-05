import mongoose from "mongoose";

const peopleSchema = mongoose.Schema({
    name:{type:String},
    password:{type:String}
})



export default mongoose.models.people || mongoose.model("people",peopleSchema);