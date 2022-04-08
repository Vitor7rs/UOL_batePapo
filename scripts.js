// CARREGAR MENSAGENS DO SERVIDOR
buscarMSG();
setInterval(buscarMSG, 3000);

function buscarMSG(){
    const promessa = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');
    promessa.then(plotarMSG);
}

function plotarMSG(dados){
    let resposta = dados.data;
    let mensagens = document.querySelector(" .chat-container");  
    mensagens.innerHTML = "";
    
    for(let i = 0; i<resposta.length; i++){
        
        if (resposta[i].type == "status") {
            mensagens.innerHTML+=
            `<div class="msg-container aviso" data-identifier="message">
            <div class="msg"><span class="horario">(${resposta[i].time})</span><span class="nome">${resposta[i].from}</span>  ${resposta[i].text}</div>
            </div>`
        }
        
        else if(resposta[i].type == "message"){
            mensagens.innerHTML+=
            `<div class="msg-container" data-identifier="message"> 
                <div class="msg"><span class="horario">(${resposta[i].time})</span><span class="nome">${resposta[i].from}</span> para <span class="nome">Todos</span>: ${resposta[i].text}</div>
            </div>`
        }

        else if (resposta[i].type == "private_message" && nome === resposta[i].to){
            mensagens.innerHTML+= 
            `<div class="msg-container reservada" data-identifier="message">
            <div class="msg"> <span class="horario">(${resposta[i].time})</span> <span class="nome">${resposta[i].from}</span> 
            reservadamente para <span class="nome">${resposta[i].to}</span>: Oi gatinha quer tc?</div>
        </div>`
        }
    }
    window.scrollTo(0, document.body.scrollHeight);
}

// IDENTIFICAR USUARIO E VERIFICAR CONEXÃO
let nome = "";
let nomeObjeto = "";

entrarNome();
function entrarNome(){
    nome = prompt("Insira seu nome aqui");
    nomeObjeto={name: nome};

    const nomeEnviado = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', nomeObjeto);
    nomeEnviado.then(logado);
    nomeEnviado.catch(erroLogin);

    function logado(){
        alert('Logado');
        manterLogin();
        setInterval(manterLogin, 4999);
    }

    function erroLogin(){
        nome = prompt("Nome já em uso, insira outro");
        nomeObjeto={name: nome};

        const nomeEnviado = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', nomeObjeto);
        nomeEnviado.then(logado);
        nomeEnviado.catch(erroLogin);
    }
}

setInterval(manterLogin, 3000);
function manterLogin(){
    const logado = axios.post('https://mock-api.driven.com.br/api/v4/uol/status', nomeObjeto);
}

// ENVIAR MENSAGENS
function enviarMensagem(){
    let textoMensagemPick = document.querySelector(' .chat-input input')
    
    let mensagemSend = {
        from: nome,
        to: "todos",
        text: textoMensagemPick.value,
        type: "message"
    }

    let uparMensagem = axios.post('https://mock-api.driven.com.br/api/v4/uol/messages', mensagemSend);

    textoMensagemPick.value="";

    uparMensagem.then(buscarMSG);
    uparMensagem.catch(falhaAoEnviar);

    function falhaAoEnviar(){
        alert('Erro ao enviar mensagem, recarregando página');
        window.location.reload()
    }
}
