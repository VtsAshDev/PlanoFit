import { jsPDF } from 'jspdf';

export class PlanoAlimentar {
  constructor(resposta) {
    this.resposta = resposta;
  }

  formatarPlano() {
    let formatted = this.resposta;

    // Substituindo novas linhas para adicionar uma linha extra entre os parágrafos
    formatted = formatted.replace(/\n/g, '\n\n');

    // Convertendo negrito (**) para <b> e separando com quebras de linha
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, (match, p1) => {
        return `<br><b>${p1}</b><br>`;
    });

    // Convertendo itálico (*) para <i>
    formatted = formatted.replace(/\*(.*?)\*/g, (match, p1) => `<i>${p1}</i>`);

    // Convertendo cabeçalhos (##) para <h2>
    formatted = formatted.replace(/## (.*?)\n/g, (match, p1) => `<h2>${p1}</h2>`);

    // Adicionando uma linha extra antes de cada lista iniciada com "*" (para fazer o salto de linha)
    formatted = formatted.replace(/\* (.*?)\n/g, (match, p1) => `\n* ${p1}\n`);

    return formatted;
  }
  

  gerarPDF() {
    const doc = new jsPDF();

    const formattedContent = this.formatarPlano();

    doc.html(formattedContent, {
      callback: function (doc) {
        doc.save('plano-alimentar.pdf');
      },
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
