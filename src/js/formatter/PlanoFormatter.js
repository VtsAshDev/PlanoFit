export class PlanoFormatter {
  static format(resposta) {
    let formatted = resposta;
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    formatted = formatted.replace(/## (.*?)\n/g, '<h2>$1</h2>');
    formatted = formatted.replace(/\* (.*?)\n/g, '<ul><li>$1</li></ul>');
    return formatted;
  }
}