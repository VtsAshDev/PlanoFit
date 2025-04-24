import Swal from 'sweetalert2';

export function validateFormData(Form)
{
  const validation = [
    {
      condition: Form.getIdade() < 18,
      message: "Você deve ter pelo menos 18 anos para usar este serviço."
    },
    {
      condition: Form.getIdade() > 100,
      message: "Idade inválida. Por favor, insira uma idade entre 0 e 120."
    },
    {
      condition: Form.getAltura() < 100 || Form.getAltura() > 250,
      message: "Altura inválida. Por favor, insira uma altura entre 100 e 250 cm."
    },
    {
      condition: Form.getKg() < 40 || Form.getKg() > 150,
      message: "Peso inválido. Por favor, insira um peso entre 30 e 300 kg."
    },
    {
      condition: Form.getObjetivo() === undefined,
      message: "Objetivo inválido. Por favor, selecione um objetivo."
    },
    {
      condition: Form.getSexo() === undefined,
      message: "Sexo inválido. Por favor, selecione um sexo."
    },
    {
      condition: Form.getSexo() !== "mulher" && Form.getSexo() !== "homem",
      message: "Sexo inválido. Por favor, selecione 'mulher' ou 'homem'."
    }
  ];

  for (const { condition, message } of validation) {
      if (condition) {
        ValidationToast.fire({
          title: message
        });
        return false;
      }
    }
    return true;
}

const ValidationToast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
  background: '#f44336',
  color: '#fff',
  iconColor: '#fff',
  icon: 'error',
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});