const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema

const subCategorySchema = new Schema({
    ID:{unique:true,type:String},
    MALL_CATEGORY_ID:{type:Number},
    MALL_SUB_NAME:{type:String},
    COMMENTS:{type:String},
    SORT:{type:Number}
})
//模型化
mongoose.model('SubCategory',subCategorySchema);

