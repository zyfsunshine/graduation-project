const mongoose = require("mongoose");
const db = "mongodb://localhost/market-db"; //数据库名称

//载入schema需要的引入的
//引入通配符
const glob=require('glob');
//将相对路径转变为绝对路径
const {resolve}=require('path');

exports.initSchemas=()=>{
    //将所有schema都引过来
    glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require);
}


exports.connect = () => {
  //连接数据库
  mongoose.connect(db);
  let maxConnectTimes = 0;
  return new Promise((resolve, reject) => {
    //增加数据库的监听事件，比如断开连接
    mongoose.connection.on("disconnected", (err) => {
      console.log("********数据库断开********");
      if (maxConnectTimes <= 3) {
        maxConnectTimes++;
        mongoose.connect(db);

      } else {
        reject(err);
        throw new Error("数据库出现问题，程序无法搞定，请人为处理");
      }

    })
    //当数据库出错的时候：
    mongoose.connection.on("error", (err) => {
      console.log("数据库出错");
      if (maxConnectTimes <= 3) {
        maxConnectTimes++;
        mongoose.connect(db);

      } else {
        reject(err);
        throw new Error("数据库出现问题，程序无法搞定，请人为处理");
      }

    })
    //数据库链接打开时，
    mongoose.connection.once("open", () => {
      console.log("mongodb connect");
      resolve();
    })
  });


}
