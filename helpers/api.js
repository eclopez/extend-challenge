const URL = process.env.NEXT_PUBLIC_TMDB_API_URL;
const VERSION = process.env.NEXT_PUBLIC_TMDB_API_VERSION;
const KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const IMAGE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL;
const POSTER_SIZE = process.env.NEXT_PUBLIC_TMDB_POSTER_THUMBNAIL_SIZE;
const BACKDROP_SIZE = process.env.NEXT_PUBLIC_TMDB_BACKDROP_SIZE;

const fetcher = (resource, params) => {
  let queryString = `api_key=${KEY}`;
  for (const [key, value] of Object.entries(params)) {
    queryString += `&${key}=${value}`;
  }
  const url = `${URL}/${VERSION}/${resource}?${queryString}`;
  return fetch(url).then(res => res.json());
};

const posterLoader = ({ src, width, quality }) => {
  return `${IMAGE_URL}/${POSTER_SIZE}${src}?w=${width}&q=${quality}`;
};

const backdropUrl = (src, width, quality) => {
  return `${IMAGE_URL}/${BACKDROP_SIZE}${src}?w=${width}&q=${quality}`;
};

export { fetcher, posterLoader, backdropUrl };
