import {createClient} from 'redis'

let client=createClient();//{url if redis is present in remote server}
export const redFun=()=>{

    
    client.connect().then(()=>{
        console.log("Redis Connected")
    });

}
export default client