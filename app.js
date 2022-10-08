import DesoApi from "./api.js";
import fs from "fs"
import path from 'path';
const deso = new DesoApi


import express from 'express'
const app = express()
const port = 3000

async function getuserinfo(request){
    const result = await deso.getKey(request)
    return result
}

app.get('*', (req, res) => {
 
  
  const value = Promise.resolve(getuserinfo(req.originalUrl.substring(1))).then(result =>{
    if(result){
      /*
      var dir = `./${req.originalUrl.substring(1)}`;
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }
      */
      const resp = Object.values(JSON.parse(result))
      for (let i = 0; i < resp.length; i++) {
      
         /*
        fs.writeFile(`./${req.originalUrl.substring(1)}/${Object.keys(resp[i])[0]}`,`${Object.values(resp[i])[0]}`, function(err){
          console.log("Saved")
        }) */
        if(Object.keys(resp[i])[0] == "index.html"){
          res.setHeader("Content-Type", "text/html");
          res.writeHead(200);
          res.end(`${Object.values(resp[i])[0]}`);
        }
      }
    }else{
      res.sendFile(path.resolve() + `/error.html`)
    }
    
  })
  
 /* try{
    
      if(fs.existsSync(path.resolve() + `/${req.originalUrl.substring(1)}`)){
        res.sendFile(path.resolve() + `/${req.originalUrl.substring(1)}/index.html`)
      }else{
        res.sendFile(path.resolve() + `/error.html`)
      }
  }catch(err){
    res.sendFile("If you are expecting a website refresh the page.")
  }   
  res.sendFile(path.resolve() + `/error.html`)*/
})


app.listen(port, () => {
  console.log("Listening of this path")
})
