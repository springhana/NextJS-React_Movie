import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Title from "@/components/Title";

interface paramsType {
  params: string[];
}
interface genresType {
  id: number;
  name: string;
}
interface countriesType {
  iso_3166_1: string;
  name: string;
}
interface companiesType {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}
interface movieType {
  poster_path: string;
  backdrop_path: string;
  original_title: string;
  overview: string;
  tagline: string;
  release_date: string;
  vote_average: number;
  runtime: number;
  genres: genresType[];
  production_countries: countriesType[];
  production_companies: companiesType[];
}

const movie = {
  poster_path: "",
  backdrop_path: "",
  original_title: "",
  overview: "",
  tagline: "",
  release_date: "",
  vote_average: 0,
  runtime: 0,
  genres: [],
  production_countries: [],
  production_companies: [],
};

// pages 폴더에서 movies폴더안에 [...id].tsx /params/movies/[...params].tsx
export default function Detail() {
  const router = useRouter();
  const [title, id]: any = router.query.params || [];
  const [info, setInfo] = useState<movieType>(movie);
  const defaultImage =
    "https://cdn-icons-png.flaticon.com/512/8058/8058802.png";

  // 영화 정보 받아오기
  const fetchMovieDetails = useCallback(async () => {
    const result = await (await fetch(`/api/movies/${id}`)).json();
    setInfo(result);
  }, [id]);

  useEffect(() => {
    fetchMovieDetails();
  }, [fetchMovieDetails]);

  return (
    <div>
      <Title title={title} />
      <div>
        <div>
          {/* 포스터 이미지 */}
          <img
            src={`https://image.tmdb.org/t/p/w500/${info.poster_path}`}
            alt="poster"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = defaultImage;
              target.classList.add("default-image");
            }}
          />
        </div>

        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500/${info.backdrop_path}`}
            alt="background"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = defaultImage;
              target.classList.add("default-image");
            }}
          />
        </div>

        <hr />
        <div>
          <div className="titleBox">
            {info.original_title}
            <p>{info.tagline}</p>
          </div>

          <div>
            {info.genres
              ? info.genres.map((genre) => (
                  <div key={genre.id}>{genre.name}</div>
                ))
              : null}
          </div>

          <p>{info.overview}</p>
        </div>
        <hr />

        <div className="details">
          <div>
            <b>Rate</b>
            <span>
              {info.vote_average ? `${info.vote_average.toFixed(1)}⭐` : null}
            </span>
          </div>

          {info.production_countries.length === 0 ? (
            <div>
              <b>Country</b>
              <span className="purple fw-700 ml-10">
                {info.production_countries.map((country) => {
                  return (
                    <span key={country.iso_3166_1}>
                      {country.name}
                      <br></br>
                    </span>
                  );
                })}
              </span>
            </div>
          ) : null}
        </div>

        <div>
          <b>Release</b>
          <span className="purple fw-700 ml-10">{info.release_date}</span>
        </div>
      </div>

      <div>
        <b>Runtime</b>
        <span className="purple fw-700 ml-10">
          {Math.floor(info.runtime / 60)}h {info.runtime % 60}m
        </span>
      </div>

      <div>
        <b>Production</b>
        {info.production_companies ? (
          <ul className="purple fw-700 ml-10">
            {info.production_companies.map((company) => (
              <li key={company.id}>{company.name}</li>
            ))}
          </ul>
        ) : (
          <li></li>
        )}
      </div>
    </div>
  );
}
// export async function getServerSideProps({ params: { params } }: any) {
//   return {
//     props: {
//       params,
//     },
//   };
// }
