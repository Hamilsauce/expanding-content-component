const seriesArray = [
	{
		id: 1,
		seriesLength: 7,
		playedCount: 2,
		players: [
			{
				id: 1,
				name: Jake,
				wins: 4
					},
			{
				id: 2,
				name: Kit,
				wins: 1
			}
		],
		games: [
			{
				id: 1,
				map: 'Fruit Islands',
				date: '03/21/2021',
				winner: 'Jake',
				playerRanks: [
					{
						player: 'Jake',
						rank: 1,
						stars: 5
					},
					{
						player: 'Kit',
						rank: 2,
						stars: 0
					}
				]
			}
		],
		seriesWinner: null,
		creationDate: '03/21/2021',
		finishDate: null,
		gameTitle: 'Super Mario Party',
		active: true,
		archived: false
	}
]