// initialize unsplash api
import { createApi } from 'unsplash-js';

// on your node server
const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
  //...other fetch options
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v2/venues/search?ll=${latLong}&query=${query}&client_id=${process.env.NEXT_PUBLIC_FOURSQUARE_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_FOURSQUARE_CLIENT_SECRET}&v=20211027&limit=${limit}`;
};

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: 'coffee shop',
    perPage: 40,
  });
  const unsplashResults = photos.response.results;
  const photosResponse = unsplashResults.map((result) => result.urls['small']);
  return photosResponse;
};

export const fetchCoffeeStores = async (
  latLong = '19.904698290863656, 99.83477746487337',
  limit = 6
) => {
  const photos = await getListOfCoffeeStorePhotos();
  const response = await fetch(
    getUrlForCoffeeStores(latLong, 'coffee stores', limit)
  );
  const data = await response.json();
  return data.response.venues.map((venue, idx) => {
    return {
      // ...venue,
      id: venue.id,
      address: venue.location.address || null,
      name: venue.name,
      neighborhood:
        venue.location.neighborhood || venue.location.crossStreet || '',
      imgUrl: photos[idx],
    };
  });
};
