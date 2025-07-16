import { PlanoFormatter } from '../formatter/PlanoFormatter.js';

export class PlanoAlimentar {
  constructor(resposta, pdfGenerator) {
    this.resposta = resposta;
    this.pdfGenerator = pdfGenerator;
  }

  gerarPDF() {
    const formattedContent = PlanoFormatter.format(this.resposta);
    this.pdfGenerator.generate(formattedContent, 'plano-alimentar.pdf');
  }
}