import axios from 'axios';

const BingMapsAPIKey = "AuNDcKi4J7jGZpwBYD2abQamcApeM2DZ3dOGP9-3PL1qqZTGVRB3g1yP8lOKjVsl";
const adminDistrict = "CA";
const maxResults = 5;
const postalCode = 94105;
const locality = "Somewhere";

const getUrl = addressLine => {
  return encodeURI(`http://dev.virtualearth.net/REST/v1/Locations/US/${adminDistrict}/${postalCode}/${locality}/${addressLine}?maxResults=${maxResults}&key=${BingMapsAPIKey}`);
}

const getLocation = async (addressLine) => {
  return axios.get(getUrl(addressLine)).then(response => {
    let resourceSet = response.data['resourceSets'][0];
    let resource = resourceSet['resources'][0];
    return resource['point'];
  }).catch((err) => new Error(err));
}

export default async (map) => {
  let promises = [];
  Object.values(map).forEach(v => {
    promises.push(getLocation(v.address));
  });

  for (let i=0; i<promises.length; i++) {
    try {
      let point = await promises[i];
      map[i] = { ...map[i], point };
      console.log(map[i]);
    } catch(_) { }
  }
  return Object.values(map);
}
