// export default aclass SeriesService {
export default class SeriesService {
	constructor() {
		this.url = './data/series-data.json';
	}

	static async fetchSeriesJson(url) {
		// let result;
		const res = await fetch(url)
		this.seriesJson = await res.json()
		this.parsedData = JSON.parse(this.seriesJson)
	console.log('seried this', this);
		return this.parsedData;
	}
}

// export default new SeriesService();