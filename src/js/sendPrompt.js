export async function sendPrompt(Form, tmb) {
  const dados = {
    idade : Form.getIdade(),
    altura : Form.getAltura(),
    peso : Form.getKg(),
    tmb,
    sexo : Form.getSexo(),
    objetivo : Form.getObjetivo(),
  };
  
  try {
    const envio = await fetch("https://planofitapi.onrender.com/gerar-plano", {
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


