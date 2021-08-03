// export default aclass SeriesService {
export default class SeriesService {
	constructor() {}

	static async fetchSeriesJson(url) {
		const res = await fetch(url)
		const parsedData = await res.json();
		return parsedData;
	}
}

// export default new SeriesService();