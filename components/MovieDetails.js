import Image from "next/image";
import { posterLoader, backdropUrl } from "../helpers/api";
import styles from "./styles/MovieDetails.module.sass";

const MovieDetails = ({ movie }) => {
  const backdrop_url = backdropUrl(movie.backdrop_path, 780, 100);

  return (
    <div
      className={styles.movie_details}
      style={{
        "backgroundImage": `linear-gradient(to top, rgba(255,255,255,1) 30%, rgba(255,255,255,0)), url(${backdrop_url})`,
      }}>
      <div className={styles.movie_details_poster}>
        <Image
          loader={posterLoader}
          src={movie.poster_path}
          alt={movie.title}
          width={185}
          height={185 * 1.5}
          quality={100}
        />
      </div>
      <div className={styles.movie_details_info}>
        <h1 className={styles.movie_details_info_title}>{movie.title}</h1>
        <h2 className={styles.movie_details_info_vote_average}>{movie.vote_average}</h2>
        <p className={styles.movie_details_info_overview}>{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
