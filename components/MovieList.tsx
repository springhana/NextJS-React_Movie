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
    router.query.page == null ? 1 : parseInt(router.query.page[0]); // url에서 받아온 영화 종류
  const [movies, setMovies] = useState<MoviesType[]>(); // 영화들을 담을 정보
  const [totalPage, setTotalPage] = useState<number>(1); // 총 영화 갯 수

  // 영화를 받아오기 위한 메서드
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

  // 영화 클릭 시
  const onMovieClick = (id: number, title: string) => {
    router.push(`/movies/${title}/${id}`);
  };

  return (
    <div className="MovieList">
      <Title title={props.title}></Title>
      <div className="MovieList__type">
        <span>{props.title}</span>
      </div>
      <div className="MovieList__movies">
        {movies ? (
          movies?.map((movie: MoviesType) => (
            <div
              onClick={() => onMovieClick(movie.id, movie.title)}
              key={movie.id}
              className="MovieList__movie"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                className="MovieList__poster"
                alt="poster"
              />
              <Link
                href={`/movies/${movie.original_title}/${movie.id}`}
                key={movie.id}
                legacyBehavior
              >
                <a className="MovieList__original_title">
                  {movie.original_title}
                </a>
              </Link>
            </div>
          ))
        ) : (
          <div>Loading</div>
        )}
      </div>

      <Pagination type={props.type} page={currentPage} totalPage={totalPage} />

      <style jsx>{`
        .MovieList {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .MovieList__movies {
          position: relative;
          margin-top: 50px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
        }
        .MovieList__type {
          position: relative;
          margin-top: 100px;
          text-align: center;
          font-family: "DOSPilgiMedium";
        }
        .MovieList__type span {
          font-size: 30px;
          color: tomato;
        }
        .MovieList__movie {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          height: 100%;
          padding: 5px;
        }
        .MovieList__poster {
          position: relative;
          width: 300px;
          height: 450px;
          border-radius: 20px;
          transition: 0.35s ease-in-out;
          border: 5px solid white;
        }
        .MovieList__poster:hover {
          border-color: black;
          bottom: 5px;
        }
        .MovieList__original_title {
          position: relative;
          text-align: center;
          font-size: 16px;
          text-decoration: none;
          margin-top: 10px;
          color: black;
          width: 100%;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
}
