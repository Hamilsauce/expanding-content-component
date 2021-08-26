export class CharacterService {
	constructor() {}

	static async fetchCharacterJson(url) {
		const res = await fetch(url)

		return await res.json().characters;
	}
}

export class SeriesService {
	constructor() {}

	static async fetchSeriesJson(url) {
		const res = await fetch(url)
	
		return await res.json();
	}
}

{
	CharacterService,
	SeriesService
}