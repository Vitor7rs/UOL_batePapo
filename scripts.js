const promisseMSG = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');
promisseMSG.then(mostrarMSG);


function mostrarMSG(msg){
    console.log(msg.data);
}


