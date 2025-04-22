import { jsPDF } from 'jspdf';

export class PlanoAlimentar {
  constructor(resposta) {
    this.resposta = resposta;
  }

  formatarPlano() {
    let formatted = this.resposta;

    // Substituindo novas linhas para adicionar uma linha extra entre os parágrafos
    formatted = formatted.replace(/\n/g, '<br><br>');

    // Convertendo negrito (**) para <b> e separando com quebras de linha
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, (match, p1) => {
        return `<b>${p1}</b>`;
    });

    // Convertendo itálico (*) para <i>
    formatted = formatted.replace(/\*(.*?)\*/g, (match, p1) => `<i>${p1}</i>`);

    // Convertendo cabeçalhos (##) para <h2>
    formatted = formatted.replace(/## (.*?)\n/g, (match, p1) => `<h2>${p1}</h2>`);

    // Convertendo lista (com *) para <ul> e <li>
    formatted = formatted.replace(/\* (.*?)\n/g, (match, p1) => `<ul><li>${p1}</li></ul>`);

    return formatted;
  }
  
  gerarPDF() {
    const doc = new jsPDF();

    const formattedContent = this.formatarPlano();

    // Criando um contêiner temporário para inserir o HTML
    const tempElement = document.createElement('div');
    tempElement.innerHTML = formattedContent;

    // Usando jsPDF para gerar o PDF a partir do HTML formatado
    doc.html(tempElement, {
      margin: [10, 10, 10, 10],
      x: 10,
      y: 10, 
      width: 180,
      windowWidth: 800,
      autoPaging: true,
      html2canvas: {
        scale: 0.2
      }
    });

    doc.save('plano-alimentar.pdf');
  }
}

