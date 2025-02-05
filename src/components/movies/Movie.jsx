import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { destroyMovie } from "../../api/fetch";
import "./Movie.css";

import ErrorMessage from "../errors/ErrorMessage";
import { getOneMovie } from "../../api/fetch";

function Movie() {
  const [movie, setMovie] = useState({});
  const [loadingError, setLoadingError] = useState(false);

  const { id } = useParams();
  const navi = useNavigate();

  useEffect(() => {
    getOneMovie(id)
      .then((movieData) =>{
        setMovie(movieData);
        // because state in an obj we need to check Object.keys()
        if (Object.keys(movieData).length === 0) {
          setLoadingError(true);
        } else {
          setLoadingError(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoadingError(true);
      })
  },[id]);

  function handleDelete(id) {
    destroyMovie(id).then((msg) => {
                                    console.log(`${id} is deleted successfully from the database`);
                                    alert(`${id} is deleted successfully from the database`);
                                    navi('/movies');
                                  }
                        ).catch((err) => {
                                            console.error(err);
                                            setLoadingError(true);
                                          });
  }

  return (
    <section className="movies-movie-wrapper">
      <h2>{movie.title}</h2>
      <section className="movies-movie">
        {loadingError ? (
          <ErrorMessage />
        ) : (
          <>
            <aside>
              <p>
                <span>Duration:</span> {movie.duration}
              </p>
              <p>
                <span>Listed Categories:</span> {movie.listedIn}
              </p>
              <p>
                <span>Country:</span> {movie.country}
              </p>
              <p>
                <span>Rating:</span> {movie.rating}
              </p>
              <p>
                <span>Date Added:</span> {movie.dateAdded}
              </p>
            </aside>
            <article>
              <p>{movie.description}</p>
            </article>
            <aside>
              <button className="delete" onClick={() => handleDelete(movie.id)}>
                Remove movie
              </button>
              <Link to={`/movies/${id}/edit`}>
                <button>Edit</button>
              </Link>
            </aside>
          </>
        )}
      </section>
    </section>
  );
}

export default Movie;
