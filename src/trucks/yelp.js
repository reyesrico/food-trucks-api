import cheerio from 'cheerio';
import getPoints from '../helpers/geolocation.js';
import trim from '../helpers/trim.js';

export default async (data) => {
	const html = data;
	const $ = cheerio.load(html);

	let title = trim($('h1', html).text());
	let street = $('.css-1bmgof7 .raw__373c0__tQAx6').text();
	let city = $('.css-znumc2 .raw__373c0__tQAx6').text();
	let address = trim(`${street} ${city}`);

	console.log('yelp');
	let res = await getPoints({ 0: { title, address } });
	return res;
};
