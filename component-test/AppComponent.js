export class App {
	constructor() {
		this.selector = '#app';
		this.data = {
			heading: 'My Todos',
			todos: ['Swim', 'Climb', 'Jump', 'Play']
		}
	}
	template(props) {
		return `
			<h1>${props.heading}</h1>
			<ul>
				${props.todos
					.map((todo, i) => {
						return `<li data-id="${i}" class="todo-item">${todo} ${i}</li>`;
					}).join('')}
			</ul>`;
	}

	render() {
		const el = document.querySelector(this.selector)
		const props = this.data;
		el.innerHTML = this.template(props)

	}
};

{
	App
}