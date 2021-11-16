
buscarMSG();
setInterval(buscarMSG, 3000);

function buscarMSG(){
    const promessa = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');
    promessa.then(plotarMSG);
    console.log("buscando");
}


function plotarMSG(dados){
    let resposta = dados.data;
    let mensagens = document.querySelector(" .chat-container");  
    mensagens.innerHTML = "";
    
    for(let i = 0; i<resposta.length; i++){
        
        if (resposta[i].type == "message") {
            mensagens.innerHTML+=
            `<div class="msg-container aviso">
            <div class="msg"><span class="horario">(${resposta[i].time})</span><span class="nome">${resposta[i].from}</span>  ${resposta[i].text}</div>
            </div>`
        }
        else if(resposta[i].type == "status"){
            mensagens.innerHTML+=
            `<div class="msg-container"> 
                <div class="msg"><span class="horario">(${resposta[i].time})</span><span class="nome">${resposta[i].from}</span> para <span class="nome">Todos</span>: ${resposta[i].text}</div>
            </div>`
        }

        else if (resposta[i].type == "private_message" && nome === resposta[i].to){
            mensagens.innerHTML+= 
            `<div class="msg-container reservada">
            <div class="msg"> <span class="horario">(${resposta[i].time})</span> <span class="nome">${resposta[i].from}</span> 
            reservadamente para <span class="nome">${resposta[i].to}</span>: Oi gatinha quer tc?</div>
        </div>`
        }

    }
    window.scrollTo(0, document.body.scrollHeight);
}

let nome = "";
let nomeObjeto = "";
function (){

}

