import { jsPDF } from 'jspdf';
import { GeradorPDF } from './GeradorPDF.js';

export class JsPDFGenerator extends GeradorPDF {
  generate(htmlContent, fileName = 'PlanoFit.pdf') {
    const doc = new jsPDF();
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlContent;

    doc.html(tempElement, {
      margin: [10, 10, 10, 10],
      x: 10,
      y: 10,
      width: 180,
      windowWidth: 800,
      autoPaging: true,
      html2canvas: { scale: 0.2 },
      callback: function (doc) {
        doc.save(fileName);
      }
    });
  }
}