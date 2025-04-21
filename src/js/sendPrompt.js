export async function sendPrompt(idade, altura,peso,objetivo, sexo, tmb) {
  const dados = {
    idade,
    altura,
    peso,
    tmb,
    sexo,
    objetivo,
  };

  try {
    const envio = await fetch("https://planofitapi.onrender.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    if (!envio.ok) {
      throw new Error(`Erro ao enviar: ${envio.status}`);
    }

    const resposta = await envio.json();
    console.log("Resposta do servidor:", resposta);
    return resposta;

  } catch (erro) {
    console.error("Erro ao enviar dados:", erro);
    throw erro;
  }
}


