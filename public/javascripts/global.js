//递归处理数据成标准格式
function recursiveData(data,pid){
    var result = [], temp;
    for(var i in data){
        if(data[i].pid==pid){
            result.push(data[i]);
            temp = recursiveData(data,data[i].id);
            if(temp.length>0){
                data[i].children=temp;
            }
        }
    }
    return result;
}