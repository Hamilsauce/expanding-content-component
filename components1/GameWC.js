export class Game extends HTMLElement {
	constructor() {
		super();
		let template = document.getElementById('my-paragraph');
		let templateContent = template.content;

		const shadowRoot = this.attachShadow({ mode: 'open' })
			.appendChild(templateContent.cloneNode(true));
	}
}

customElements.define('my-paragraph',

);