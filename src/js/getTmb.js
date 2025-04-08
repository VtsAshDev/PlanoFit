export function getTmb(sexo, idade, altura, kg) {
  console.log({ sexo, idade, altura, kg });
  let tmb = Math.round(
    sexo === "mulher"
      ? 655 + 9.6 * kg + 1.8 * altura - 4.7 * idade
      : 66 + 13.7 * kg + 5 * altura - 6.8 * idade
  );
  console.log("TMB: " + tmb);
  return tmb;
}