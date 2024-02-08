export function getForm() {
  const dados = document.querySelector("#form");
  var inputs = dados.getElementsByTagName("input");
  let sex = document.querySelector("#select-form-sexo");
  let objective = document.querySelector("#select-form");
  var userData = [];

  for (var i = 0; i < inputs.length; i++) {
    var allinput = inputs[i];
    userData.push({ nome: allinput.name, value: allinput.value });
  }
  userData.push({ nome: sex.name, value: sex.value });
  userData.push({ nome: objective.name, value: objective.value });
  let sexo, idade, altura, kg, objetivo;

  sexo = userData.find((user) => user.nome === "sexo").value;
  idade = parseInt(userData.find((user) => user.nome === "idade").value);
  altura = parseInt(userData.find((user) => user.nome === "altura").value);
  kg = parseInt(userData.find((user) => user.nome === "kg").value);
  objetivo = userData.find((user) => user.nome === "objetivo").value;

  return { sexo, idade, altura, kg, objetivo };
}
