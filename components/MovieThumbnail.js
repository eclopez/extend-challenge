import Image from "next/image";
import { posterLoader } from "../helpers/api";
import styles from "./styles/MovieThumbnail.module.sass";

const Movie = ({ movie }) => {
  return (
    <figure className={styles.movie_thumbnail}>
      <Image
        className={styles.movie_thumbnail_image}
        loader={posterLoader}
        src={movie.poster_path}
        alt={movie.title}
        width={185}
        height={185}
        quality={100}
      />
      <figcaption className={styles.movie_thumbnail_caption}>{movie.title}</figcaption>
    </figure>
  );
};

export default Movie;
