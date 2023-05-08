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
interface Props {
  results: Movie[];
}

// Server에서 results를 갖고 옴 (next.config.js)
export default function Home({ results }: Props) {
  const [random, setRandom] = useState(0); // 메인 영화 랜덤으로 보여주기 위한 것
  const router = useRouter(); // 주소 갖고오기

  useEffect(() => {
    setRandom(Math.floor(Math.random() * 19)); // 랜덤으로 뽑기
  }, []);

  // 메인 영화
  const [MainPath] = useState<string[]>(
    results.map((movie: Movie) => movie.backdrop_path)
  );
  const [MainTitle] = useState<string[]>(
    results.map((movie: Movie) => movie.original_title)
  );

  // 영화 클릭 리스너
  const movieClick = (id: number, title: string) => {
    router.push(`/movies/${title}/${id}`);
  };
  return (
    <div>
      <Title title="Home" />
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w780/${MainPath[random]}`}
          style={{ width: "780px", height: "440px" }}
        />
        <h1>{MainTitle[random]}</h1>
      </div>
      {results?.map((movies: Movie) => (
        <div
          key={movies.id}
          onClick={() => movieClick(movies.id, movies.title)}
        >
          {/* https://image.tmdb.org/t/p/<이미지 크기>/<이미지 파일명> */}
          <img src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`} />
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

export async function getServerSideProps() {
  // 여기에 있는 코드들은 Server에 들어간다. results는 함수내의 정의된 변수 변경x
  const { results } = await (
    await fetch(`https://next-js-react-movie.vercel.app/api/movies`)
  ).json();

  return {
    props: {
      results,
    },
  };
}
