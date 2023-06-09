import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Title from "../components/Title";

// movie type
interface Movie {
  original_title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  title: string;
  id: number;
}

export default function Home() {
  const router = useRouter(); // 주소 갖고오기
  const [random] = useState(Math.floor(Math.random() * 19)); // 메인 영화 랜덤으로 보여주기 위한 것
  const [movie, setMovie] = useState<Movie[]>([]); // API로 불러온 영화 담을 배열
  const [loading, setLoading] = useState<boolean>(true); // 로딩

  // 메인 영화 정보들
  const [mainPath, setMainPath] = useState<string>("");
  const [mainTitle, setMainTitle] = useState<string>("");
  const [mainPosterPath, setMainPosterPath] = useState<string>("");
  const [mainRating, setMainRating] = useState<number>(0);

  // ===== 슬라이드를 위한 것 =====
  const left: React.MutableRefObject<number> = useRef(0);
  const currentInx: React.MutableRefObject<number> = useRef(0);
  const slideCount: number = 20;
  const [lef, setLef] = useState<number>(left.current);

  // 홈 화면 영화들 슬라이드 메서드
  function moveSlide(num: number) {
    left.current = -num * 400;
    setLef(left.current);
    currentInx.current = num;
  }
  const btnNext = () => {
    if (currentInx.current < slideCount - 3) {
      moveSlide(currentInx.current + 1);
    } else {
      moveSlide(0);
    }
  };
  const btnPrev = () => {
    if (currentInx.current > 0) {
      moveSlide(currentInx.current - 1);
    } else {
      moveSlide(slideCount - 3);
    }
  };
  // =========================

  async function getDatas() {
    const response = await (await fetch(`/api/movies`)).json();
    setMovie(response.results);
    setLoading(false);

    // 메인 영화 정보들
    setMainPath(response.results[random].backdrop_path);
    setMainTitle(response.results[random].original_title);
    setMainPosterPath(response.results[random].poster_path);
    setMainRating(response.results[random].vote_average);
  }

  useEffect(() => {
    getDatas();
  }, [router]);

  // 영화 클릭 리스너
  const movieClick = (id: number, title: string) => {
    router.push(`/movies/${title}/${id}`);
  };

  return (
    <div className="home">
      <Title title="Home" />
      {/* 배경 솜? 같은 것 */}
      <div className="home__shape-small"></div>
      <div className="home__shape-mid"></div>
      <div className="home__shape-big"></div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <div className="main_Movie">
            <img
              src={`https://image.tmdb.org/t/p/w780/${mainPath}`}
              alt="mainPoster"
              className="main_Movie__Pic"
            />
            <span className="main_Movie__PosterPic">
              <img
                src={`https://image.tmdb.org/t/p/w780/${mainPosterPath}`}
                alt="mainPoster"
                className="main_Movie__poster"
              />
              <div className="movie_rating__hover">
                {mainRating ? mainRating.toFixed(1) : null}⭐
              </div>
            </span>
            <h1 className="main_Movie__title">{mainTitle}</h1>
          </div>

          <div className="movies">
            {movie?.map((movies: Movie) => (
              <div
                key={movies.id}
                onClick={() => movieClick(movies.id, movies.title)}
                style={{
                  position: "relative",
                  left: `${lef}px`,
                  transition: "left 0.5s ease-out",
                }}
              >
                {/* https://image.tmdb.org/t/p/<이미지 크기>/<이미지 파일명> */}
                <span>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`}
                    className="movie__poster"
                    alt="poster"
                  />
                  <div className="movie_rating__hover">
                    {movies.vote_average
                      ? movies.vote_average.toFixed(1)
                      : null}
                    ⭐
                  </div>
                </span>
                <Link
                  href={`/movies/${movies.original_title}/${movies.id}`}
                  // as={`/movies/${movies.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <h4 className="movie__title">
                    {movies.original_title.length > 20
                      ? `${movies.original_title.slice(0, 20)}...`
                      : movies.original_title}
                  </h4>
                </Link>
              </div>
            ))}
          </div>

          {/* prev | next 버튼 */}
          <p className="controls">
            <span className="prev" onClick={btnPrev}>
              ◀️
            </span>
            <span className="next" onClick={btnNext}>
              ▶️
            </span>
          </p>
        </>
      )}
      <style jsx>{`
        .home {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: hsl(2, 100%, 95%);
          overflow: hidden;
        }
        .loading {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          font-size: 40px;
          font-weight: bold;
          font-family: "DOSPilgiMedium";
        }
         {
          /* main Movie */
        }
        .main_Movie {
          margin: 160px 0 30px 0;
        }
        .main_Movie__Pic {
          border: 3px solid black;
          border-radius: 10px;
          width: 780px;
          height: 440px;
          scale: 1.2;
        }
        .main_Movie__poster {
          width: 250px;
          height: 375px;
        }
        .main_Movie__PosterPic {
          position: absolute;
          border: 3px solid black;
          border-radius: 10px;
          width: 250px;
          height: 375px;
          scale: 1.2;
          overflow: hidden;
          transition: 0.4s ease-in-out;
          animation: poster 4s ease-in-out infinite;
        }
        @keyframes poster {
          0% {
            margin-top: 50px;
          }
          25% {
            margin-top: 0;
          }
          50% {
            margin-top: 50px;
          }
          75% {
            margin-top: 0px;
          }
          100% {
            margin-top: 50px;
          }
        }
        .main_Movie__PosterPic:hover {
          border-color: wheat;
        }
        .main_Movie__title {
          position: relative;
          background: none;
          left: -50px;
          color: wheat;
        }
         {
          /* movies */
        }
        .movies {
          position: relative;
          display: flex;
          align-items: center;
          text-align: center;
          width: 1200px;
          background-color: hsl(2, 100%, 90%);
          border: 3px solid black;
          border-radius: 10px;
          overflow: hidden;
        }
        .movie__poster {
          width: 400px;
          height: 600px;
          margin: 0;
        }
        .movie_rating__hover {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: black;
          color: white;
          font-size: 30px;
          opacity: 0;
          transition: 0.5s ease-in-out;
        }
        .movie_rating__hover:hover {
          opacity: 0.8;
        }
        .movie__title {
          color: black;
        }
         {
          /* controls */
        }
        .controls {
          text-align: center;
          margin-top: 50px;
        }
        .controls span {
          position: relative;
          bottom: 400px;
          background-color: hsl(2, 100%, 90%);
          border: 3px solid black;
          border-radius: 5px;
          color: black;
          padding: 10px;
          margin: 0 410px;
          cursor: pointer;
          transition: 0.3s ease-in-out;
        }
        .controls span:hover {
          background-color: hsl(2, 100%, 96%);
        }
        .prev {
          right: 200px;
        }
        .next {
          left: 200px;
        }
         {
          /* 솜 같은 배경 */
        }
        .home__shape-small,
        .home__shape-mid,
        .home__shape-big {
          position: absolute;
          background-color: hsl(2, 100%, 80%);
          border-radius: 50%;
          filter: blur(80px);
        }
        .home__shape-small {
          width: 200px;
          height: 200px;
          top: 10rem;
          left: -5rem;
        }
        .home__shape-mid {
          width: 200px;
          height: 200px;
          top: 50rem;
          left: -2rem;
        }
        .home__shape-big {
          width: 250px;
          height: 250px;
          top: 25rem;
          right: -6rem;
        }
      `}</style>
    </div>
  );
}

// Server에서 results를 갖고 옴 (next.config.js)
// export async function getServerSideProps() {
//   // 여기에 있는 코드들은 Server에 들어간다. results는 함수내의 정의된 변수 변경x
//   const { results } = await (
//     await fetch(`https://next-js-react-movie.vercel.app/api/movies`)
//   ).json();

//   return {
//     props: {
//       results,
//     },
//   };
// }
