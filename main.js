import Swal from 'sweetalert2'
import { Form } from './src/js/Form.js'
import { getTmb } from './src/js/getTmb.js'
import { sendPrompt } from './src/js/sendPrompt.js'
import { PlanoAlimentar } from './src/js/PlanoAlimentar.js'

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

  const dados = form.getAll();
  const tmb = getTmb(dados.sexo, dados.idade, dados.altura, dados.peso);

  try {
    const response = await sendPrompt(
      dados.idade,
      dados.altura,
      dados.peso,
      dados.objetivo,
      dados.sexo,
      tmb
    );
    
    const plano = new PlanoAlimentar(response.resposta);
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
  }
});

