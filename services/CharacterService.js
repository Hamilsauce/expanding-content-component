export default class CharacterService {
	constructor() {
		this.url = './data/character-data.json';
		this.parsedData;
		this.jsonData;
		
	}

	static async fetchCharacterJson(url) {
		const res = await fetch(url)
		this.parsedData = await res.json();
		// console.log(this.parsedData);
		return this.parsedData;
	}
	static fetchCharacterLocal() {
		// const res = await fetch(url)
		this.jsonData = localStorage.getItem('smpCharacterData');
		this.localData = JSON.parse(this.jsonData);
		// console.log(this.jsonData);
		// console.log('char this',this);
		return this.jsonData;
	}
}

// export default new SeriesService();