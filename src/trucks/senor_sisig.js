import cheerio from 'cheerio';

export default data => {
    const html = data;
    const $ = cheerio.load(html);

    let resp = [];
    let map = {};

    // TITLES
    $('article.eventlist-event--upcoming .eventlist-title-link', html)
    .each((_, link) => {
      let text = link.children[0];
      let textTrimmed = text.data.trim();
      if (!map[textTrimmed]) {
        map = { ...map, [textTrimmed]: 0 };
        resp.push({ title: text.data });
      }
    });

    return resp;
};
