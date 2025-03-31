function checkData(data){
    for(key in data){
        if(data[key].trim() === ''){
            throw new Error('Not all inputs filled!')
        }
    }
}