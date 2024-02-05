//chat e form
const apiKey = "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";
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

  return planoGpt(objetivo, sexo, tmb);
}

function planoGpt(objetivo, sexo, tmb) {
  let plano;
  if (objetivo === "emagrecimento") {
    plano = `Plano alimentar para emagrecimento informando as calorias das refeicoes para ${sexo} de acordo com tmb ${tmb}kcal`;
  } else if (objetivo === "saude") {
    plano = `Plano alimentar saudável informando as calorias das refeicoes para ${sexo} de acordo com tmb ${tmb}kcal`;
  } else if (objetivo === "muscular") {
    plano = `Plano alimentar para ganho de massa muscular informando as calorias das refeicoes para ${sexo} de acordo com tmb ${tmb}kcal e junto a isso um treino de musculação`;
  }
  console.log(plano);
  return sendMessage(plano);
}

function sendMessage(plano) {
  console.log(plano);
  //
  var status = document.getElementById("status");
  var btnsubmit = document.getElementById("send");
  status.style.display = "block";
  status.innerHTML = `
    <div role="status">
      <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
  
`;

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
      model: "gpt-3.5-turbo-instruct",
      prompt: plano,
      max_tokens: 2048,
      temperature: 0.5,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
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
  let formattedResponse = formatTextWithLineBreaks(response);

  return handleGetFormValues(formattedResponse);
}

function formatTextWithLineBreaks(text) {
  let parts = text.split(/(?=[A-Z])/);

  let formattedText = parts.join("\n");

    

  return formattedText;
}

function handleGetFormValues(formattedResponse) {
  const whatsapp = document.getElementById("wpp").value;
  console.log(whatsapp);
  const message = formattedResponse;

  if (typeof whatsapp !== "string" || whatsapp === "") {
    return alert("Digite um número de Whatsapp válido");
  }
  if (typeof message !== "string" || message === "") {
    return alert("Digite uma mensagem");
  }

  return handleSubmitWhatsappMessage(whatsapp, message);
}

async function handleSubmitWhatsappMessage(whatsapp, message) {
  const GZAPPY_URL = "https://api.gzappy.com/v1/message/send-message";

  const response = await fetch(GZAPPY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      user_token_id: "648b6267-dfaf-4c82-9131-bc17444f34ed",
    },
    body: JSON.stringify({
      instance_id: "EJIUWMULK81JFQ0C7QAL9W5D",
      instance_token: "3f29d85e-bb36-4073-8b2a-3a3333b47c5e",
      message: [message],
      phone: whatsapp,
    }),
  });

  const data = await response.json();

  console.log(data);
}

async function handleSubmitForm() {
  const data = handleGetFormValues();
  console.log(data);
  if (data) {
    await handleSubmitWhatsappMessage(data.whatsapp, data.message);
    console.log(data.whatsapp);
  }
}
