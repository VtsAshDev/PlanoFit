import Swal from 'sweetalert2'
import {getForm} from './src/js/getForm.js'
import { getTmb } from './src/js/getTmb.js';
import { getPrompt } from './src/js/getPrompt.js';


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
  
  const tmb= getTmb(formData.sexo, formData.idade, formData.altura, formData.kg);

  const Prompt = getPrompt(formData.objetivo,formData.sexo,tmb);

  console.log(Prompt);


});

