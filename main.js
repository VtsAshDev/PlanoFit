import { apiKey,emailjsapi } from "./src/js/apis";

import Swal from 'sweetalert2'


const submit = document.querySelector("#send");

var userData = [];
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

  return planoGpt(objetivo, sexo, tmb);
}

function planoGpt(objetivo, sexo, tmb) {
  let plano;
  if (objetivo === "emagrecimento") {
    plano = `Plano alimentar para emagrecimento informando as calorias das refeicoes para ${sexo} de acordo com tmb ${tmb}kcal e junto a isso um treino de musculação`;
  } else if (objetivo === "saude") {
    plano = `Plano alimentar saudável informando as calorias das refeicoes para ${sexo} de acordo com tmb ${tmb}kcal e junto a isso um treino de musculação`;
  } else if (objetivo === "muscular") {
    plano = `Plano alimentar para ganho de massa muscular informando as calorias das refeicoes para ${sexo} de acordo com tmb ${tmb}kcal e junto a isso um treino de musculação`;
  }
  return sendMessage(plano);
}

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
      // console.log(error, "Deu erro Verifique ");
    })
    .finally(() => {
      svgBtn.classList.add("hidden");
      btnSubmit.innerHTML = "Criar Seu Plano";
      btnSubmit.style.cursor = "pointer";

      Swal.fire({
        title: "E-mail Enviado Com sucesso!",
        text: "Caso não encontre verifique sua Caixa de Spam\nBoa Sorte em Sua Jornada !",
        imageUrl: "./src/imgs/mailalert.svg",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
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
