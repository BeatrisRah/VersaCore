export function checkData(data){
    if(Object.keys(data).length === 0){
        return true
    }
    for(const key in data){
        if(data[key].trim() === ''){
            return true
        }
    }
    return null
}

