export function planoGpt(objetivo,sexo,tmb) {
  let plano;
  
  if (objetivo === "emagrecimento") {
    plano = `Plano alimentar para emagrecimento informando as calorias das refeicoes para ${sexo} de acordo com tmb ${tmb}kcal`;
  } else if (objetivo === "saude") {
    plano = `Plano alimentar saudável informando as calorias das refeicoes para ${sexo} de acordo com tmb ${tmb}kcal`;
  } else if (objetivo === "muscular") {
    plano = `Plano alimentar para ganho de massa muscular informando as calorias das refeicoes para ${sexo} de acordo com tmb ${tmb}kcal`;
  }
  
  return{plano}
}