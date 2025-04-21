export class Form {
  constructor(formSelector = "#form") {
    this.form = document.querySelector(formSelector);
    if (!this.form) throw new Error(`Formulário "${formSelector}" não encontrado.`);
  }

  get formData() {
    return new FormData(this.form);
  }

  get data() {
    return Object.fromEntries(this.formData.entries());
  }

  getSexo() {
    return this.data.sexo;
  }

  getIdade() {
    return parseInt(this.data.idade);
  }

  getAltura() {
    return parseInt(this.data.altura);
  }

  getKg() {
    return parseInt(this.data.kg);
  }

  getObjetivo() {
    return this.data.objetivo;
  }

  getAll() {
    return {
      idade: this.getIdade(),
      altura: this.getAltura(),
      peso: this.getKg(),
      objetivo: this.getObjetivo(),
      sexo: this.getSexo()
    };
  }
}
