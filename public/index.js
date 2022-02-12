
const url = ( window.location.hostname.includes('localhost'))
? 'http://localhost:3000/'
: 'https://tiendamilena.com.ar/';

let get = "navigator.userAgent"

const enviar = (data) =>{
    fetch(url + "data",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch(err => {
        return err;
    });
    
}


async function getIpClient() {
    try {
      const response = await axios.get('https://api.ipify.org?format=json');
      console.log(response);
      enviar(response)
    } catch (error) {
      console.error(error);
    }
  }
  
  getIpClient();