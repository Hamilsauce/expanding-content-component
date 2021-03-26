const seriesContainers = document.querySelectorAll(".series-content");
const seriesButtons = document.querySelectorAll(".series-collapsible");
const gameColl = document.querySelectorAll(".game-collapsible");


// seriesContainers.forEach(elm => {
// 	elm.addEventListener('click', e => {
// 		console.log('curtar');
// 		console.log(e.currentTarget);
// 		let el = e.currentTarget
// 		e.target.classList.toggle("active");
// 		let content = e.target.nextElementSibling;
// 		if (el.style.maxHeight) {
// 			// el.style.maxHeight = null;
// 			el.style.zIndex = 30;
// 			el.style.maxHeight = content.scrollHeight + "px";
// 		} else {
// 			el.style.zIndex = 30;
// 			el.style.maxHeight = content.scrollHeight + "px";
// 		}
// 	});
// });

const calculateSeriesHeight = (seriesContent) => {
	// seriesContent.style.maxHeight = null;
	// if (seriesContent.style.maxHeight) {
	// 	seriesContent.style.zIndex = 0;
	// } else {
	seriesContent.style.zIndex = 30;
	seriesContent.style.maxHeight = seriesContent.scrollHeight + "px";
	// }
}


seriesButtons.forEach(el => {
	el.addEventListener('click', e => {
		e.target.classList.toggle("active");
		
		let content = e.target.nextElementSibling;
	
		if (content.style.maxHeight) {
			const childContents = [...content.querySelectorAll('.content')];
		
			childContents.forEach(ch => {
				ch.style.maxHeight = null
				ch.style.zIndex = 0
				ch.classList.add('hide')
			});

			content.style.maxHeight = null;
			content.style.zIndex = 0;
		} else {
			calculateSeriesHeight(content)
		}
	});
});

gameColl.forEach(gameBtn => {
	gameBtn.addEventListener('click', e => {
		const seriesContent = e.target.parentElement.parentElement.parentElement;
		const gameContent = e.target.nextElementSibling;
		gameBtn.classList.toggle("active");
		gameContent.classList.toggle('hide')

		let gameHeight = parseInt(gameContent.style.maxHeight.replace('px', ''))
		let seriesHeight = parseInt(seriesContent.style.maxHeight.replace('px', ''))

		if (gameHeight) {
			gameContent.style.maxHeight = 0; // 1) set it zero to reset series height
			calculateSeriesHeight(seriesContent)
			gameContent.style.maxHeight = null; // 2) Set it null so it passes if condition
		} else {
			gameContent.style.maxHeight = gameContent.scrollHeight + "px";
			gameContent.style.zIndex = 30;
			seriesContent.style.zIndex = 30;
			seriesContent.style.maxHeight = `${parseInt(seriesContent.style.maxHeight) + parseInt(gameContent.scrollHeight)}px`;
		}
	})
})


document.querySelector('.add-series-button')
	.addEventListener('click', e => {
		const seriesList = document.querySelector('.series-list')
		const gameContainer = document.createElement('div');

		gameContainer.innerText = 'new container'

		seriesList.appendChild(gameContainer)
	})


//TODO When a new game is added, recalculate series height!	
document.querySelector('.add-game-button')
	.addEventListener('click', e => {
		const content = e.target.parentElement;
		const gameList = document.querySelector('.game-list')
		const gameContainer = document.createElement('div');

		gameContainer.innerText = 'new container'
		gameList.appendChild(gameContainer)
		calculateSeriesHeight(content)
	})

const createSeries = () => {
	const seriesList = document.querySelector('.series-list')
	const newSeriesContainer = document.createElement('div');
	const newSeriesCollapsible = document.createElement('button');
	const newSeriesContent = document.createElement('div');
}