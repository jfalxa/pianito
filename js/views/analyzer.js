/** @type HTMLTemplateElement */
const template = document.getElementById("analyzer-template");

class AnalyzerView extends HTMLElement {
  connectedCallback() {
    this.append(template.content.cloneNode(true));

    this.models = {
      keyboard: document.querySelector("model-keyboard"),
    };

    this.ui = {
      chord: this.querySelector("#chord"),
    };

    this.listenToModels();
  }

  listenToModels = () => {
    this.models.keyboard.addEventListener("change", () => {
      const chord = this.models.keyboard.getChords();
      this.ui.chord.textContent = chord.join(", ") || "-";
    });
  };
}

export default AnalyzerView;
