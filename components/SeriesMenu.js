export class SeriesMenu {
	constructor(props) {
		this.selector = 'series-menu-container';
		this.data = {
			heading: 'My Todos',
			todos: ['Swim', 'Climb', 'Jump', 'Play']
		}
	}
	template(props) {
		return `
			<div class="series-menu-button">Menu</div>
			<ul class="series-menu hide" data-series="1">
				<li class="series-menu-item add-game-button" data-series="1">Add Game</li>
				<li class="series-menu-item delete-series-button" data-series="1">Delete Series</li>
				<li class="series-menu-item edit-series-button" data-series="1">Edit Series Name</li>
				<li class="series-menu-item archive-series-button" data-series="1">Archive Series</li>
			</ul>
		</div>`;
	}

	render() {
		// const el = document.querySelector(this.selector)
		const el = document.querySelector(this.selector)

		const props = this.data;
		el.innerHTML = this.template(props)

	}
}

{
	App
}