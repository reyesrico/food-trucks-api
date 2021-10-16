import cheerio from 'cheerio';
import getPoints from '../helpers/geolocation.js';
import trim from '../helpers/trim.js';

export default async (html) => {
  const $ = cheerio.load(html);
  let map = {};

  $('.eve_row.eve_today h3 a').each((index, element) => {
    map = { ...map, [index]: { title: element.children[0].data } };
  });

  $('.eve_row.eve_today .eve_addy').each((index, element) => {
    element.children.forEach(e => {
      if (e.type === 'text') {
        const address = trim(e.data);
        map[index] = { ...map[index], address };
      }
    });
  });

  console.log('street_food');
  let res = await getPoints(map);
  return res;
};
