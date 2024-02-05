//chat e form
const apiKey = "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";
const submit = document.querySelector("#send");

var userData = [];
var userInfo = [];
var chatReturn = "";

submit.addEventListener("click", (event) => {
  event.preventDefault();
  getForm();
});

// Pegando os dados do usuário
function getForm() {
  const dados = document.querySelector("#form");
  var inputs = dados.getElementsByTagName("input");
  let sex = document.querySelector("#select-form-sexo");
  let objective = document.querySelector("#select-form");

  for (var i = 0; i < inputs.length; i++) {
    var allinput = inputs[i];
    userData.push({ nome: allinput.name, value: allinput.value });
  }
  userData.push({ nome: sex.name, value: sex.value });
  userData.push({ nome: objective.name, value: objective.value });

  let sexo, idade, altura, kg, objetivo;

  userData.forEach((user) => {
    if (user.nome === "sexo") {
      sexo = user.value;
    }
    if (user.nome === "idade") {
      idade = parseInt(user.value);
    }
    if (user.nome === "altura") {
      altura = parseInt(user.value);
    }
    if (user.nome === "kg") {
      kg = parseInt(user.value);
    }
    if (user.nome === "objetivo") {
      objetivo = user.value;
    }
  });

  return getTmb(sexo, idade, altura, kg, objetivo);
}

function getTmb(sexo, idade, altura, kg, objetivo) {
  const tmb = Math.round(
    sexo === "mulher"
      ? 655 + 9.6 * kg + 1.8 * altura - 4.7 * idade
      : 66 + 13.7 * kg + 5 * altura - 6.8 * idade
  );
  console.log(tmb);
  return planoGpt(objetivo, sexo, tmb);
}

function planoGpt(objetivo, sexo, tmb) {
  let plano;
  if (objetivo === "emagrecimento") {
    plano = `Plano alimentar para emagrecimento para ${sexo} de acordo com tmb ${tmb}kcal`;
  } else if (objetivo === "saude") {
    plano = `Plano alimentar saudável para ${sexo} de acordo com tmb ${tmb}kcal`;
  } else if (objetivo === "muscular") {
    plano = `Plano alimentar para ganho de massa muscular para ${sexo} de acordo com tmb ${tmb}kcal`;
  }
  console.log(plano);
  return sendMessage(plano)
}

function sendMessage(plano) {
  //   if (!userData.value) {
  //     alert("Complete o Formulário");
  //     return;
  //   }
  var status = document.getElementById("status");
  var btnsubmit = document.getElementById("send");
  status.style.display = "block";
  status.innerHTML = "Carregando...";
  btnsubmit.disabled = true;
  btnsubmit.style.cursor = "not-allowed";

  fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      prompt: plano,
      max_tokens: 2048,
      temperature: 0.5,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      chatReturn = response.choices[0].text;
      status.style.display = "none";
      chatResponseContent(chatReturn);
    })
    .catch((error) => {
      console.log(error, "Deu erro Verifique ");
    })
    .finally(() => {
      btnsubmit.disabled = false;
      btnsubmit.style.cursor = "pointer";
    });
}

function chatResponseContent(response) {
  var historic = document.getElementById("historic");

  var boxchatResponseMessage = document.createElement("p");
  boxchatResponseMessage.className = "box-response-message";
  var chatResponse = document.createElement("p");
  chatResponse.className = "chat-message";
  chatResponse.innerHTML = response;

  boxchatResponseMessage.appendChild(chatResponse);
  historic.appendChild(boxchatResponseMessage);
}

// let send = document.querySelector('#send')

// send.addEventListener('click',event =>{
//     event.preventDefault();
//     handleSubmitForm();
// })

// function handleGetFormValues(){
//     const whatsapp = document.getElementById('whatsapp').value
//     const message = document .getElementById('message').value

//     if(typeof whatsapp !== 'string' || whatsapp ===""){
//         return alert('Digite um número de Whatsapp válido')
//     }
//     if(typeof message !== 'string' || message === ""){
//         return alert ("Digite uma mensagem")
//     }
//     return{
//         whatsapp,
//         message
//     }
// }

// async function handleSubmitWhatsappMessage(phone,message){
//     const GZAPPY_URL = "https://api.gzappy.com/v1/message/send-message"

// const response = await fetch(GZAPPY_URL, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     "user_token_id": '648b6267-dfaf-4c82-9131-bc17444f34ed'
//   },
//   body: JSON.stringify({
//     instance_id: "EJIUWMULK81JFQ0C7QAL9W5D",
//     instance_token: "3f29d85e-bb36-4073-8b2a-3a3333b47c5e",
//     message: [message],
//     phone: phone
//   })
// })

// const data = await response.json()

// console.log(data)

// }

// async function handleSubmitForm(){
//     const data = handleGetFormValues();
//     console.log(data)
//     if(data){
//         await handleSubmitWhatsappMessage(data.whatsapp,data.message)
//         console.log(data.whatsapp)
//     }
// }console.log('vtnc')
