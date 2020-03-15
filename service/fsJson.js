//提纯文件
const fs=require('fs');
fs.readFile('./data_json/goods.json','utf8',function(err,data){  //异步读取的方法
    let newData=JSON.parse(data);
    let pushData=[];
    let i=0;
    newData.RECORDS.map(function(value,index){
        if(value.IMAGE1){
            i++;
            // console.log(value.name);
            pushData.push(value);
        }
    })
    console.log(i);
    //还需要写入一个 新的文件里将提纯好的数据
    fs.writeFile('./data_json/newGoods.json',JSON.stringify(pushData),function(err){
        if(err){
            console.log("写入文件失败")
        }else{
            console.log("写入文件成功")
        }
    })

})