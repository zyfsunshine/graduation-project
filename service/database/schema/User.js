const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
const bcrypt = require("bcrypt"); //加盐加密处理的第三方库
const SALT_WORK_FACTOR = 10;

//创建我们的User schema
const userSchema = new Schema({
  UserId: {
    type: ObjectId
  }, //或者直接 ObjectId
  userName: {
    unique: true,
    type: String
  },
  password: String,
  createAt: {
    type: Date,
    default: Date.now()
  }, //创建用户时间
  lastLoginAt: {
    type: Date,
    default: Date.now()
  }, //最后登录时间

})
//这里的第二个参数必须是声明函数，不可以是箭头函数。加密处理
userSchema.pre('save', function (next) {
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      // this就是userSchema
      this.password = hash
      next()
    })
  })
})
//登录的业务逻辑 
// 是一个实例方法，new了一个对象才能使用
userSchema.methods={
    comparePassword:(_password,password)=>{
        return new Promise((resolve,reject)=>{
            bcrypt.compare(_password ,password,(err,isMatch)=>{
                if(!err) resolve(isMatch);
                else reject(err);
            })
        })
    }
}

//发布模型
module.exports =mongoose.model('User', userSchema);
