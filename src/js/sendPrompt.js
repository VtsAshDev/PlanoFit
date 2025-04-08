export async function sendPrompt(objetivo, sexo, tmb) {
  const dados = {
    objetivo,
    sexo,
    tmb,
  };

  try {
    const envio = await fetch("https://sua-api.com/endpoint", {
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
    return resposta;

  } catch (erro) {
    console.error("Erro ao enviar dados:", erro);
    throw erro;
  }
}
