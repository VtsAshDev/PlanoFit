export function getForm() {
  const formData = new FormData(document.querySelector("#form"));

  const userData = Object.fromEntries(formData.entries());

  const sexo = userData.sexo;
  const idade = parseInt(userData.idade);
  const altura = parseInt(userData.altura);
  const kg = parseInt(userData.kg);
  const objetivo = userData.objetivo;

return sexo, idade, altura, kg, objetivo ;
}



