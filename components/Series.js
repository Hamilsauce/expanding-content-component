console.log('games');
seriesArray[0].games
	.forEach(game => {
		const newGame = new Game($(document, '.game-list'), game)
		$(document, '.game-list').appendChild(newGame.render())
		$$(document, '.player-container')
			.forEach((pl, i, pls) => {
				// pl.addEventListener('click', e => {
				// 	pl.classList.add('selected')

				// 	if (e.target != pls[i]) {
				// 		p.classList.remove('selected')
				// 	}
				// })
			})
	})