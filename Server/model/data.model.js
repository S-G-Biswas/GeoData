
const mongoose=require("mongoose")

const dataSchema=mongoose.Schema({
    type:{type:String},
    coordinates:[]
},{
    versionKey:false
})

const dataModel = mongoose.model("data",dataSchema)

module.exports={
    dataModel
}