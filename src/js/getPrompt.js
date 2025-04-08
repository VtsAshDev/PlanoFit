export function getPrompt(objetivo,sexo,tmb) {
  let plano;

  const textos = {
    emagrecimento : "Plano alimentar para emagrecimento",
    saude : "Plano alimentar saudável",
    muscular : "Plano alimentar para ganho de massa muscular"
  }

  const titulo = textos[objetivo];

  if(!titulo){
    return "Objetivo Inválido!";
  }
  
  return `${titulo} informando as calorias das refeicoes para ${sexo} de acordo com tmb ${tmb}kcal`;
  
}