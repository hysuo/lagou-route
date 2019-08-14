class Http{
    get(){
        return fetch('/api/listmore.json?pageNo=2&pageSize=15')
        .then(response => response.json())
        .then(res =>{
            return res;
        })
    }
}
export default new Http();