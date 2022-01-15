import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "../helpers/api";
import MovieSearchSelector from "../components/MovieSearchSelector";
import MovieThumbnail from "../components/MovieThumbnail";
import MovieDetails from "../components/MovieDetails";
import styles from "./styles/index.module.sass";

const Index = ({ years, sortFields, initialYear, initialSortField, initialId }) => {
  const router = useRouter();

  const [selectedYear, setSelectedYear] = useState(initialYear || years[0]);
  const [selectedSortField, setSelectedSortField] = useState(initialSortField || sortFields[0]);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(undefined);

  let params = { "primary_release_year": selectedYear };
  const { data, error, mutate } = useSWR(["movie/top_rated", params], fetcher);

  if (error) { console.log(error); }

  useEffect(() => {
    if (data) {
      setMovies(sortMovies(data.results.slice(0, 10)));
    } else {
      setMovies([]);
    }
  }, [data]);

  useEffect(() => {
    if (!selectedMovie || !movies.includes(selectedMovie)) {
      setSelectedMovie(movies.find(m => m.id == initialId) || movies[0]);
    }
  }, [movies]);

  useEffect(() => {
    mutate();
  }, [selectedYear]);

  useEffect(() => {
    setMovies(sortMovies(movies));
  }, [selectedSortField]);

  useEffect(() => {
    changeUrl();
  }, [selectedYear, selectedSortField, selectedMovie])

  const changeUrl = () => {
    const queryString = `/?year=${selectedYear}&sortField=${selectedSortField}&id=${selectedMovie?.id}`;
    router.push(
      queryString,
      undefined,
      { shallow: true }
    );
  };

  const changeYear = (e) => {
    setSelectedYear(e.target.value);
  };

  const changeSort = (e) => {
    setSelectedSortField(e.target.value);
  };

  const sortMovies = (moviesToSort) => {
    let sortedMovies = [...moviesToSort];
    if (["vote_average", "vote_count"].includes(selectedSortField)) {
      sortedMovies.sort((a, b) => a[selectedSortField] - b[selectedSortField]);
    } else {
      sortedMovies.sort((a, b) => {
        if (a[selectedSortField] < b[selectedSortField]) { return -1; }
        if (a[selectedSortField] > b[selectedSortField]) { return 1; }
        return 0;
      });
    }
    return sortedMovies;
  };

  const displayDetails = (e, id) => {
    e.preventDefault();
    setSelectedMovie(movies.find(movie => movie.id == id));
  };

  return (
    <div className={styles.movie_app}>
      {selectedMovie &&
        <MovieDetails movie={selectedMovie} />
      }
      <div className={styles.movie_search}>
        <div className={styles.movie_search_selections}>
          <MovieSearchSelector options={years} defaultValue={selectedYear} onChange={changeYear} />
          <MovieSearchSelector options={sortFields} defaultValue={selectedSortField} onChange={changeSort} />
        </div>
        <div className={styles.movie_search_results}>
          <ul className={styles.movie_search_results_list}>
            {movies.map(movie => (
              <li key={movie.id} className={styles.movie_search_results_list_item}>
                <a href="#" onClick={e => displayDetails(e, movie.id)}>
                  <MovieThumbnail movie={movie} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = ({ query }) => {
  const currentYear = new Date().getFullYear();
  const sortFields = ["title", "release_date", "vote_average", "vote_count"];
  const { year, sortField, id } = query;

  let years = [];
  for (let i = 0; i < 5; i++){
    years[i] = currentYear - (i + 1);
  }

  return {
    props: {
      years,
      sortFields,
      initialYear: year || null,
      initialSortField: sortField || null,
      initialId: id || null,
    }
  }
};

export default Index;
