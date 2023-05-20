import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import Title from "@/components/Title";

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
  key: string;
  poster_path: string;
  backdrop_path: string;
  original_title: string;
  overview: string;
  tagline: string;
  release_date: string;
  homepage: string;
  vote_average: number;
  runtime: number;
  genres: genresType[];
  production_countries: countriesType[];
  production_companies: companiesType[];
}

const movie = {
  key: "",
  poster_path: "",
  backdrop_path: "",
  original_title: "",
  overview: "",
  tagline: "",
  release_date: "",
  homepage: "",
  vote_average: 0,
  runtime: 0,
  genres: [],
  production_countries: [],
  production_companies: [],
};

// pages 폴더에서 movies폴더안에 [...id].tsx /params/movies/[...params].tsx
export default function Detail() {
  const router = useRouter();
  const refs: any = useRef([]); // detail__Companies의 refs
  const prev: any = useRef(""); // prev style을 위한 ref
  const next: any = useRef(""); // next style을 위한 ref
  const ref: any = useRef(0); // next | prev 버튼을 유지하기 위해 만든 ref
  const indexs: any = useRef(0); // next | prev 버튼을 유지하기 위해 만든 indexs
  const [title, id]: any = router.query.params || []; // url에서 받아온 title, id
  const [info, setInfo] = useState<movieType>(movie); // id로 검색해서 받아온 영화 정보들
  // 디폴트 이미지
  const defaultImage =
    "https://cdn-icons-png.flaticon.com/512/8058/8058802.png";

  // 장르 갯수 만큼 배열에 저장
  const setRef = (index: any) => (element: any) => {
    refs.current[index + 1] = element; // 각 요소에 대한 참조 할당
  };

  // 영화 정보 받아오기
  const fetchMovieDetails = useCallback(async () => {
    const result = await (await fetch(`/api/movies/${id}`)).json();
    setInfo(result);
  }, [id]);

  useEffect(() => {
    fetchMovieDetails();
  }, [info, router]);

  // 장르 Next 버튼 (투명화도 포함)
  const companiesMoveNext = (index: any) => {
    if (info.production_companies.length - 1 > index) {
      prev.current.style.opacity = "1";
      refs.current[index + 1].style.opacity = "0";
      ref.current++;
      indexs.current = ref.current;
      // console.log(ref.current);
      if (info.production_companies.length - 1 === index + 1) {
        next.current.style.opacity = "0.5";
      }
    } else {
      indexs.current = index;
      console.log(indexs.current);
    }
  };
  // 장르 Prev 버튼 (투명화도 포함)
  const companiesMovePrev = (index: any) => {
    if (1 <= index) {
      next.current.style.opacity = "1";
      refs.current[index].style.opacity = "1";
      indexs.current--;
      ref.current = indexs.current;
      // console.log(indexs.current);
      if (index === 1) {
        prev.current.style.opacity = "0.5";
      }
    } else {
      ref.current = index;
    }
  };

  return (
    <div className="detail">
      <div className="detail__contain">
        <Title title={title} />
        {/* 배경 솜? 같은 것 */}
        <div className="home__shape-small"></div>
        <div className="home__shape-big"></div>

        <div>
          <div className="detail__img_pic">
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
              className="detail__img"
            />
            <div className="detail__img_backdrop_pic">
              <img
                src={`https://image.tmdb.org/t/p/w500/${info.backdrop_path}`}
                alt="background"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = defaultImage;
                  target.classList.add("default-image");
                }}
                className="detail__img_backdrop"
              />

              <div className="detail__title">
                {info.original_title}
                <p className="detail__tagline">({info.tagline})</p>
              </div>

              <div className="detail__genres">
                {info.genres
                  ? info.genres.map((genre) => (
                      <div key={genre.id} className="detail__genres_inner">
                        <div className="detail__genres_genre">{genre.name}</div>
                        <div className="detail__genres_shape"></div>
                      </div>
                    ))
                  : null}
              </div>

              <div className="detail__movie_info">
                <div className="detail__Release">
                  <b>Release&nbsp;</b>
                  <span>{info.release_date}</span>
                </div>

                <div className="detail__Runtime">
                  <b>Runtime&nbsp;</b>
                  <span>
                    {Math.floor(info.runtime / 60)}h {info.runtime % 60}m
                  </span>
                </div>

                <div className="detail__Rate">
                  <b>Rate&nbsp;</b>
                  <span>
                    {info.vote_average
                      ? `${info.vote_average.toFixed(1)}⭐`
                      : null}
                  </span>
                </div>
              </div>

              <div className="detail__Countries">
                {info.production_countries ? (
                  <div>
                    <b style={{ marginRight: "10px" }}>Country : </b>
                    <span>
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

              <div className="detail__Companies">
                <b className="detail__Companies_title">Production</b>
                {info.production_companies ? (
                  <ul className="detail__Companies_info">
                    {info.production_companies.map((company, index) => (
                      <li
                        key={company.id}
                        style={{
                          position: "absolute",
                          zIndex: `${info.production_companies.length - index}`,
                          transition: ".5s ease-in-out",
                          width: "400px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          background: "none",
                        }}
                        ref={setRef(index)}
                      >
                        {company.name}
                        <div className="detail__Companies_shape"></div>
                      </li>
                    ))}
                    <div
                      className="detail_Companies_btn"
                      onClick={() => companiesMovePrev(indexs.current)}
                      ref={prev}
                      style={{ opacity: "0.5" }}
                    >
                      prev
                    </div>
                    <div
                      className="detail_Companies_btn"
                      onClick={() => companiesMoveNext(ref.current)}
                      ref={next}
                    >
                      next
                    </div>
                  </ul>
                ) : null}
              </div>
            </div>
          </div>

          <div
            style={{
              position: "relative",
              borderTop: "1px solid black",
              marginTop: "10px",
              marginRight: "10px",
            }}
          />
          <div
            style={{
              position: "relative",
              width: "100%",
              padding: "10px",
              fontWeight: "bold",
            }}
          >
            <p>{info.overview}</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .detail {
          position: relative;
          width: 100%;
          background: hsl(2, 100%, 95%);
          overflow: hidden;
        }
        .detail__contain {
          position: relative;
          margin: 110px 0 0 10px;
          top: 0;
          left: 0;
        }
        .detail__img_pic {
          display: flex;
        }
        .detail__img {
          position: relative;
          width: 500px;
          height: 750px;
          left: 100px;
        }
        .detail__img_backdrop_pic {
          display: flex;
          justify-content: center;
          width: 100%;
        }
        .detail__img_backdrop {
          top: 0;
          left: 0;
          width: 500px;
          height: 300px;
          transition: 0.5s ease-in-out;
        }
        .detail__title {
          position: absolute;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 10px;
          top: 15rem;
          color: black;
          font-weight: bold;
          font-size: 30px;
          background: none;
        }
        .detail__tagline {
          background: none;
          color: gray;
        }
        .detail__genres {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 30px;
          top: 19rem;
          margin: 10px;
        }
        .detail__genres_inner {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .detail__genres_genre {
          padding: 10px;
          border-radius: 30px;
          background: none;
          z-index: 1;
        }
        .detail__genres_shape {
          position: absolute;
          background-color: hsl(2, 100%, 80%);
          border-radius: 50%;
          padding: 10px;
          width: 10%;
          height: 10px;
          z-index: 0;
          filter: blur(10px);
        }
        .detail__movie_info {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 30px;
          top: 23rem;
        }
        .detail__Countries {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          top: 25rem;
        }
        .detail__Companies {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          top: 30rem;
          background: none;
        }
        .detail__Companies_info {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 300px;
          top: 10px;
          gap: 350px;
          list-style: none;
          margin-top: 30px;
        }
        .detail__Companies_shape {
          position: absolute;
          background-color: hsl(2, 100%, 80%);
          padding: 10px;
          width: 100%;
          height: 10px;
          z-index: -1;
          filter: blur(1px);
        }
        .detail_Companies_btn {
          position: relative;
          z-index: 100;
          bottom: 40px;
          padding: 5px;
          background-color: tomato;
          color: white;
          border-radius: 5px;
          cursor: pointer;
        }

        .home__shape-small,
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
// export async function getServerSideProps({ params: { params } }: any) {
//   return {
//     props: {
//       params,
//     },
//   };
// }
