import cheerio from 'cheerio';
import getPoints from '../helpers/geolocation.js';
import trim from '../helpers/trim.js';

export default async (data) => {
  const html = data;
  const $ = cheerio.load(html);

  let map = {};
  $('.card h2 a').each((index, element) => {
    map = { ...map, [index]: { title: element.children[0].data } };
  });

  $('.card .venueAddress').each((index, element) => {
    element.children.forEach(e => {
      if (e.type === 'text') {
        let address = trim(e.data);
        map[index] = { ...map[index], address };
      }
    });
  });

  console.log('foursquare');
  let res = await getPoints(map);
  return res;
};
