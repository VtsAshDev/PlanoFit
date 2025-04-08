export function getForm() {
  const formData = new FormData(document.querySelector("#form"));

  const userData = Object.fromEntries(formData.entries());

  let sexo = userData.sexo;
  let idade = parseInt(userData.idade);
  let altura = parseInt(userData.altura);
  let kg = parseInt(userData.kg);
  let objetivo = userData.objetivo;

  return { sexo, idade, altura, kg, objetivo };
}
