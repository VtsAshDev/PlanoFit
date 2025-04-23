import { jsPDF } from 'jspdf';

export class PlanoAlimentar {
  constructor(resposta) {
    this.resposta = resposta;
  }

  formatarPlano() {
    let formatted = this.resposta;

    formatted = formatted.replace(/\*\*(.*?)\*\*/g, (match, p1) => `<b>${p1}</b>`);

    formatted = formatted.replace(/## (.*?)\n/g, (match, p1) => `<h2>${p1}</h2>`);

    formatted = formatted.replace(/\* (.*?)\n/g, (match, p1) => `<ul><li>${p1}</li></ul>`);


    return formatted;
  }

  gerarPDF() {
    const doc = new jsPDF();

    const formattedContent = this.formatarPlano();
    const tempElement = document.createElement('div');
    tempElement.innerHTML = formattedContent;

    doc.html(tempElement, {
      margin: [10, 10, 10, 10],
      x: 10,
      y: 10, 
      width: 180,
      windowWidth: 800,
      autoPaging: true,
      html2canvas: {
        scale: 0.2
      },
      callback: function (doc) {
        doc.save('plano-alimentar.pdf');
      }
    });
  }
}


