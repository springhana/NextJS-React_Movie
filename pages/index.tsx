import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Title from "../components/Title";

interface Movie {
  original_title: string;
  poster_path: string;
  backdrop_path: string;
  title: string;
  id: number;
}
// interface Props {
//   results: Movie[];
// }

// Server에서 results를 갖고 옴 (next.config.js)
export default function Home() {
  const [random, setRandom] = useState(0); // 메인 영화 랜덤으로 보여주기 위한 것
  const router = useRouter(); // 주소 갖고오기
  const [movie, setMovie] = useState<Movie[]>([]);
  const [mainPath, setMainPath] = useState<string[]>([]);
  const [mainTitle, setMainTitle] = useState<string[]>([]);
  async function getDatas() {
    const response = await (await fetch(`/api/movies`)).json();
    setMovie(response.results);
    setRandom(Math.floor(Math.random() * 19)); // 랜덤으로 뽑기
    setMainPath(movie.map((movie) => movie.backdrop_path));
    setMainTitle(movie.map((movie) => movie.original_title));
  }

  useEffect(() => {
    getDatas();
  }, [router]);

  // 메인 영화

  // 영화 클릭 리스너
  const movieClick = (id: number, title: string) => {
    router.push(`/movies/${title}/${id}`);
  };
  return (
    <div>
      <Title title="Home" />
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w780/${mainPath[random]}`}
          style={{ width: "780px", height: "440px" }}
          alt="mainPoster"
        />
        <h1>{mainTitle[random]}</h1>
      </div>
      {movie?.map((movies: Movie) => (
        <div
          key={movies.id}
          onClick={() => movieClick(movies.id, movies.title)}
        >
          {/* https://image.tmdb.org/t/p/<이미지 크기>/<이미지 파일명> */}
          <img
            src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`}
            alt="poster"
          />
          <Link
            href={`/movies/${movies.original_title}/${movies.id}`}
            // as={`/movies/${movies.id}`}
          >
            <h4>{movies.original_title}</h4>
          </Link>
        </div>
      ))}
    </div>
  );
}

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
