import Swal from 'sweetalert2'
import { apiKey,emailjsapi } from "./src/js/apis.js";
import {getForm} from './src/js/getForm.js'
import { getTmb } from './src/js/getTmb.js';
import {planoGpt} from './src/js/planoGpt.js'

const form = document.querySelector("#form");

var chatReturn = "";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = getForm();
  const { sexo, idade, altura, kg, objetivo } = formData;
  
  const tmbData = getTmb(sexo,idade,altura,kg, objetivo);
  const { tmb } = tmbData;

  const planoData = planoGpt(objetivo,sexo,tmb)
  const {plano} = planoData

  sendMessage(plano)
});

// Pegando os dados do usuário






function sendMessage(plano) {
  var btnSubmit = document.getElementById("send");
  var svgBtn = document.getElementById("svgBtn");

  btnSubmit.style.cursor = "not-allowed";
  svgBtn.classList.remove("hidden");

  fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo-instruct",
      prompt: plano,
      max_tokens: 2048,
      temperature: 0.5,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      
      chatReturn = response.choices[0].text;
      chatResponseContent(chatReturn);
    })
    .catch((error) => {
      console.log(error, "Deu erro Verifique ");
    })
    .finally(() => {
      svgBtn.classList.add("hidden");
      btnSubmit.style.cursor = "pointer";

      Swal.fire({
        title: "E-mail Enviado Com sucesso!",
        text: "Caso não encontre verifique sua Caixa de Spam\nBoa Sorte em Sua Jornada !",
        icon: "success",
        confirmButtonColor: "#fbba00",
      });
    });
}

function formatTextWithLineBreaks(text) {
  let parts = text.split(/(?=[A-Z])/);

  let formattedText = parts.join("\n");

  return formattedText;
}
function chatResponseContent(response) {
  let formattedResponse = formatTextWithLineBreaks(response);

  return sendMail(
    `Agradecemos sinceramente por escolher o app Plano Fit. Estamos comprometidos em proporcionar a melhor experiência possível segue abaixo seu plano de dieta.\n${formattedResponse}\n O plano alimentar fornecido anteriormente é de caráter geral e não substitui a orientação personalizada de um profissional de saúde. Não nos responsabilizamos por qualquer repercussão decorrente da implementação sem supervisão profissional. Recomendamos consultar um nutricionista ou médico antes de realizar mudanças significativas na dieta.`
  );
}

function sendMail(formattedResponse) {
  (function () {
    emailjs.init(emailjsapi.key);
  })();
  var params = {
    sendername: "PlanoFit App",
    to: document.getElementById("email").value,
    message: formattedResponse,
  };
  var serviceID = emailjsapi.serviceID;
  var templateID = emailjsapi.templateID;
  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      return
    })
    .catch((res) => {
      alert("Email incorretou ou algum erro ");
    });
}

// function handleGetFormValues(formattedResponse) {
//   const whatsapp = document.getElementById("wpp").value;

//   const message = formattedResponse;

//   if (typeof whatsapp !== "string" || whatsapp === "") {
//     return alert("Digite um número de Whatsapp válido");
//   }
//   if (typeof message !== "string" || message === "") {
//     return alert("Digite uma mensagem");
//   }

//   return handleSubmitWhatsappMessage(whatsapp, message);
// }

// async function handleSubmitWhatsappMessage(whatsapp, message) {
//   const GZAPPY_URL = "https://api.gzappy.com/v1/message/send-message";

//   const response = await fetch(GZAPPY_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       user_token_id: "648b6267-dfaf-4c82-9131-bc17444f34ed",
//     },
//     body: JSON.stringify({
//       instance_id: "EJIUWMULK81JFQ0C7QAL9W5D",
//       instance_token: "3f29d85e-bb36-4073-8b2a-3a3333b47c5e",
//       message: [message],
//       phone: whatsapp,
//     }),
//   });

//   const data = await response.json();

//   console.log(data);
// }

// async function handleSubmitForm() {
//   const data = handleGetFormValues();
//   console.log(data);
//   if (data) {
//     await handleSubmitWhatsappMessage(data.whatsapp, data.message);
//     console.log(data.whatsapp);
//   }
// }
