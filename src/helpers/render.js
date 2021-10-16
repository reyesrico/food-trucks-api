import senor_sisg from '../trucks/senor_sisig.js';
import yelp from '../trucks/yelp.js';
import street_food_finder from '../trucks/street_food_finder.js';
import foursquare from '../trucks/foursquare.js';

export default async (truckId, data) => {
  switch(truckId) {
    case 'senor_sisig': {
      return senor_sisg(data);
    }
    case 'yelp': {
      return yelp(data);
    }
    case 'street_food_finder': {
      return street_food_finder(data);
    }
    case 'foursquare': {
      return foursquare(data);
    }
    default:
      return [{ title: '', address: '' }];
  }
};
