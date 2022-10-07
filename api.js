import axios from "axios"

//const DEFAULT_NODE_URL = "https://node.deso.org/api"
const DEFAULT_NODE_URL = "https://node.deso.org/api"
let client = null

class DesoApi {
    constructor() {
        this.client = null
        this.baseUrl = DEFAULT_NODE_URL
    }
    

    
    async getKey(user){
        
        const path = "/v0/get-single-profile"
        const data = {
            Username : user
        }
        
        try{
           
            const result = await this.getClient().post(path, data)
            const files = await this.getSinglePost(result.data.Profile.ExtraData.Website)
            return files.PostFound.PostExtraData.Files
            
        } catch (error) {
            console.log(error)
            return null
        }
    }
    
       

    async getSinglePost  (postHash){
        if(!postHash){
            console.log("postHash is required")
            return
        }

        const path = "/v0/get-single-post"
        const data = {
            PostHashHex :postHash,
            ReaderPublicKeyBase58Check:"",
        }
        try{
            const result = await this.getClient().post(path, data)
            return result?.data
        } catch (error) {
            console.log(error)
            return null
        }
    }
    

   
    getClient (){
        if (client) return client
        client = axios.create({
            baseURL: this.baseUrl,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Accept-Encoding": "gzip",
            },
          })
          return client

    }

}

export default DesoApi