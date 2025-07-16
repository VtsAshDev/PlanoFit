import Swal from 'sweetalert2'
import { Form } from './src/js/Form.js'
import { getTmb } from './src/js/getTmb.js'
import { sendPrompt } from './src/js/sendPrompt.js'
import { PlanoAlimentar } from './src/js/core/PlanoAlimentar.js'
import { validateFormData } from './src/js/validateFormData.js'
import { JsPDFGenerator } from './src/js/pdf/JsPDFGenerator.js'

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

const form = new Form();

document.querySelector("#form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const button = document.querySelector("#send");
  const buttonText = button.querySelector("span");
  const buttonIcon = button.querySelector("svg:not(#svgBtn)");
  const cookingIcon = document.querySelector("#cookingIcon");
  const loadingMessage = document.querySelector("#loadingMessage");

  button.disabled = true;
  button.classList.add('opacity-70', 'cursor-not-allowed');

  const messages = [
    "Pedindo ajuda aos Universitários...",
    "Consultando o manual secreto das calorias perdidas...",
    "Misturando whey com inteligência artificial...",
    "Pesando suas ideias e seus macros...",
    "Tirando o pão da dieta... (brincadeira, talvez)",
    "Tentando não ser cancelado no twitter....",
    "Formatando seu plano com amor, dados e café",
    "Chamando o coach do fitness intergaláctico...",
    "Ajeitando os legumes na marmita virtual...",
    "Desviando dos chocolates e focando nos resultados...",
    "Quase pronto! Só mais um agachamento de paciência..."
  ];

  let messageIndex = 0;

  const messageSpan = loadingMessage.querySelector('span');
  messageSpan.textContent = messages[messageIndex]; 
  const messageInterval = setInterval(() => 
  {
    messageIndex++;

    if (messageIndex >= messages.length) {
      clearInterval(messageInterval);
      return;
    }

    messageSpan.textContent = messages[messageIndex];
  }, 3000);

  buttonText.style.display = "none";
  buttonIcon.style.display = "none";
  cookingIcon.classList.remove("hidden");
  loadingMessage.style.display = "flex";

  const dados = form.getAll();
  if (!validateFormData(form)) {
    clearInterval(messageInterval);
    buttonText.style.display = "block";
    buttonIcon.style.display = "block";
    cookingIcon.classList.add("hidden");
    loadingMessage.style.display = "none";
    button.disabled = false;
    button.classList.remove('opacity-70', 'cursor-not-allowed');
    return;
  }

  const tmb = getTmb(dados.sexo, dados.idade, dados.altura, dados.peso);

  try {
    const response = await sendPrompt(
      form,
      tmb
    );


    const geradorPDF = new JsPDFGenerator();
    const plano = new PlanoAlimentar(response.data, geradorPDF);
    plano.gerarPDF();

    Toast.fire({
      icon: 'success',
      title: 'Plano Criado com sucesso!'
    });

  } catch (error) {
    console.error("Erro ao enviar dados:", error);

    Toast.fire({
      icon: 'error',
      title: 'Erro ao enviar dados!'
    });
  } finally {
    clearInterval(messageInterval);
    buttonText.style.display = "block";
    buttonIcon.style.display = "block";
    cookingIcon.classList.add("hidden");
    loadingMessage.style.display = "none";
    button.disabled = false;
    button.classList.remove('opacity-70', 'cursor-not-allowed');
  }
});

