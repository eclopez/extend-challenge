import styles from "./styles/MovieSearchSelector.module.sass";

const unUnderscore = str => str.toString().split("_").map(word => word[0].toUpperCase() + word.substring(1)).join(" ");

const MovieSearchSelector = ({ options, defaultValue, onChange }) => {
  return (
    <select
      className={styles.movie_search_selector}
      defaultValue={defaultValue}
      onChange={onChange}
    >
      {options.map(option => (
        <option key={option} value={option}>{unUnderscore(option)}</option>
      ))}
    </select>
  );
};

export default MovieSearchSelector;
