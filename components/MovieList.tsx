import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Title from "./Title";
import Link from "next/link";
import Pagination from "./Pagenation";

interface MoviesType {
  poster_path: string;
  original_title: string;
  title: string;
  id: number;
}

interface PropsType {
  title: string;
  type: string;
}

export default function MovieList(props: PropsType) {
  const router = useRouter(); // url 받아오기
  const currentPage =
    router.query.page == null ? 1 : parseInt(router.query.page[0]);
  const [movies, setMovies] = useState<MoviesType[]>();
  const [totalPage, setTotalPage] = useState<number | undefined>();

  async function pagination() {
    const newResults = await (
      await fetch(`/api/movies/${props.type}/page=${currentPage}`)
    ).json();
    setMovies(newResults.results);
    setTotalPage(newResults.total_pages);
  }
  useEffect(() => {
    pagination();
  }, [currentPage]);

  const onMovieClick = (id: number, title: string) => {
    router.push(`/movies/${title}/${id}`);
  };

  return (
    <div>
      <Title title={props.title}></Title>
      <div>
        <span>{props.title}</span>
      </div>

      {movies ? (
        movies?.map((movie: MoviesType) => (
          <div
            onClick={() => onMovieClick(movie.id, movie.title)}
            key={movie.id}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              className="poster"
              alt="poster"
            />
            <Link
              href={`/movies/${movie.original_title}/${movie.id}`}
              key={movie.id}
              legacyBehavior
            >
              <a>{movie.original_title}</a>
            </Link>
          </div>
        ))
      ) : (
        <div>Loading</div>
      )}

      <Pagination type={props.type} page={currentPage} totalPage={totalPage} />
    </div>
  );
}
