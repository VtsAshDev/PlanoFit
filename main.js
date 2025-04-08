import Swal from 'sweetalert2'
import { apiKey,emailjsapi } from "./src/js/apis.js";
import {getForm} from './src/js/getForm.js'
import { getTmb } from './src/js/getTmb.js';
import {planoGpt} from './src/js/planoGpt.js'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  background: '#FFC107',
  color: '#212121',
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

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
      Swal.fire({
        title: 'Ops!',
        text: 'Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.',
        icon: 'error',
        background: '#212121',
        color: '#FFC107',
        confirmButtonColor: '#FFC107',
        confirmButtonText: 'Tentar Novamente',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
    })
    .finally(() => {
      svgBtn.classList.add("hidden");
      btnSubmit.style.cursor = "pointer";

      Swal.fire({
        title: 'Plano Enviado! 🎉',
        html: `
          <div class="space-y-4">
            <p class="text-lg">Seu plano personalizado foi enviado para seu e-mail!</p>
            <div class="bg-nutri-yellow/10 p-4 rounded-lg">
              <p class="text-sm">Caso não encontre, verifique sua caixa de spam.</p>
              <p class="text-sm mt-2">Boa sorte em sua jornada! 💪</p>
            </div>
          </div>
        `,
        icon: 'success',
        background: '#212121',
        color: '#FFC107',
        confirmButtonColor: '#FFC107',
        confirmButtonText: 'Começar Agora!',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        customClass: {
          container: 'backdrop-blur-sm',
          popup: 'border border-nutri-yellow/20 shadow-nutri',
          title: 'text-2xl font-bold',
          htmlContainer: 'text-center',
          confirmButton: 'font-semibold hover:bg-nutri-yellow-dark transition-colors duration-300'
        }
      });

      Toast.fire({
        icon: 'success',
        title: 'E-mail enviado com sucesso!'
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
    .catch(() => {
      Swal.fire({
        title: 'Erro no E-mail',
        text: 'O endereço de e-mail parece estar incorreto ou ocorreu um erro no envio. Por favor, verifique e tente novamente.',
        icon: 'error',
        background: '#212121',
        color: '#FFC107',
        confirmButtonColor: '#FFC107',
        confirmButtonText: 'Tentar Novamente',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
    });
}
