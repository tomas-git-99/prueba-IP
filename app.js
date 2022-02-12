
//api rest simple con solo un get

const cors = require('cors');
const express = require('express');
const fs = require('fs');
const { v4 } = require('uuid');

const axios = require('axios').default;

//crear servidor
const app = express();



//configurar cors y public
app.use(cors());

app.use(express.json())

app.use(express.static('public'));

app.post('/data', async(req, res) => {

    
    let json_data = fs.readFileSync('data.json');
    let datas = JSON.parse(json_data);



   let lugar
   const response = await axios.get('https://api.ipgeolocation.io/ipgeo?apiKey=ce5295f43bb34b26b35248341b3728b9&ip='+req.body.data.ip)
   lugar = response.data
   

    let newdata = {
        id:v4(),
        ip:req.body.data.ip,
        dispositivo:req.headers['user-agent'],
        hora:new Date().toString(),
        lugar:lugar
    }

    datas.push(newdata);    
    let json_data_string = JSON.stringify(datas);
    fs.writeFileSync('data.json', json_data_string);


/* 
    fs.writeFile('data.json',JSON.stringify(data), (err) => {
        console.log(err)
    }); */

    res.json({
        ok: true
    })
})




app.listen(3000, () => {
    console.log('servidor corriendo en el puerto 3000');
} );