const BASE_API = "https://yts.am/api/v2";

async function getSuggestion(id) {
  const query = await fetch(
    `${BASE_API}/movie_suggestions.json?movie_id=${id}`
  );
  const { data } = await query.json();

  return data.movies;
}

async function getMovies() {
  const query = await fetch(`${BASE_API}/list_movies.json`);
  const { data } = await query.json();

  return data.movies;
}

export { getSuggestion, getMovies };
