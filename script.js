const seriesCollection = document.querySelectorAll(".series-collapsible");
const gameColl = document.querySelectorAll(".game-collapsible");

seriesCollection.forEach(el => {
	el.addEventListener('click', e => {
		e.target.classList.toggle("active");
		let content = e.target.nextElementSibling;
		if (content.style.maxHeight) {
			content.style.maxHeight = null;
			content.style.zIndex = 0;
		} else {
			content.style.zIndex = 30;
			content.style.maxHeight = content.scrollHeight + "px";
		}
	});
});


gameColl.forEach(gameBtn => {
	gameBtn.addEventListener('click', e => {
		e.target.classList.toggle("active");
		const seriesContent = e.target.parentElement.parentElement.parentElement;
		const gameContent = e.target.nextElementSibling;
	
		let gameHeight = parseInt(gameContent.style.maxHeight.replace('px', ''))
		let seriesHeight = parseInt(seriesContent.style.maxHeight.replace('px', ''))
	
		if (gameHeight) {
			gameContent.style.maxHeight = 0; // 1) set it zero to reset series height
			seriesContent.style.maxHeight = `${parseInt(seriesHeight) - parseInt(gameHeight)}px`;
			gameContent.style.maxHeight = null; // 2) Set it null so it passes if condition
		} else {
			gameContent.style.maxHeight = gameContent.scrollHeight + "px";
			seriesContent.style.zIndex = 30;
			seriesContent.style.maxHeight = `${parseInt(seriesContent.style.maxHeight) + parseInt(gameContent.scrollHeight)}px`;
		}
	})
})