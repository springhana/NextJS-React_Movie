import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Pagination from "@/components/Pagenation";
import Link from "next/link";
import Image from "next/image";

interface resultsType {
  id: number;
  original_title: string;
  poster_path: string;
  release_date: string;
  title: string;
}

export default function SearchResult() {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>("");
  const [totalPage, setTotalPage] = useState<number>(0);
  const [page, setPage] = useState<string>("");
  const [results, setResults] = useState<resultsType[]>([]);
  // 이미지가 존재하지 않으면 사용할 이미지
  const defaultImage =
    "https://cdn-icons-png.flaticon.com/512/8058/8058802.png";

  async function pagination() {
    const ref = await (
      await fetch(`/api/search/keyword=${keyword}/page=${page}`)
    ).json();
    setResults(ref.results);
    setTotalPage(ref.total_pages);
  }

  useEffect(() => {
    if (router.query.keyword) {
      setKeyword(router.query.keyword[0]); // <- ${keyword}
      setPage(router.query.keyword[1]); // <- ${page}
    }
    pagination();
  }, [router.query.keyword, keyword, page]);

  return (
    <div className="SearchResult">
      <div>
        Search Results for <b>{keyword}</b>
      </div>
      <div></div>
      {results.length !== 0 ? (
        results.map((movie) => {
          return (
            <Link
              href={`/movies/${movie.original_title}/${movie.id}`}
              key={movie.id}
              legacyBehavior
            >
              <div className="SearchResult__contain">
                <div className="SearchResult__info">
                  <div>
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt="poster"
                      className="SearchResult__img"
                      onError={(
                        e: React.SyntheticEvent<HTMLImageElement, Event>
                      ) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = defaultImage;
                        target.classList.add("default-image");
                      }}
                    />
                  </div>

                  <div className="SearchResult__title">
                    <div style={{ background: "wheat" }}>
                      {movie.original_title.length >= 100
                        ? movie.original_title
                        : `${movie.original_title.slice(0, 100)}...`}
                      <br />
                      <span>
                        {movie.original_title !== movie.title ? (
                          <div style={{ background: "wheat" }}>
                            (
                            {movie.title.length >= 100
                              ? movie.title
                              : `${movie.title.slice(0, 50)}...`}
                            )
                          </div>
                        ) : null}
                      </span>
                      <div style={{ background: "wheat" }}>
                        {movie.release_date
                          ? movie.release_date.split("-")[0]
                          : null}
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2989/2989988.png"
                  className="arrow"
                  alt="arrow"
                />
              </div>
            </Link>
          );
        })
      ) : (
        <div>No Search Results Found.</div>
      )}

      <div className="SearchResult__page">
        {results.length != 0 ? (
          <Pagination
            type={`search/${keyword}`}
            page={parseInt(page)}
            totalPage={totalPage}
          />
        ) : null}
      </div>

      <style jsx>{`
        .arrow {
          position: absolute;
          width: 100px;
          height: 100px;
          right: 0;
          margin: 30px;
          background: none;
          transition: 0.5s ease-in-out;
        }

        .SearchResult {
          position: absolute;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          top: 150px;
          width: 100%;
        }
        .SearchResult__contain {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 10px;
          width: 1000px;
          height: 250px;
          overflow: hidden;
          border: 5px solid rgb(255, 248, 248);
          background: wheat;
          border-radius: 10px;
          transition: 0.5s ease-in-out;
        }
        .SearchResult__contain:hover {
          border-color: black;
        }
        .SearchResult__contain:hover .arrow {
          right: -20px;
        }
        .SearchResult__info {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .SearchResult__img {
          position: absolute;
          width: 150px;
          height: 200px;
          left: 50px;
          top: 25px;
        }
        .SearchResult__title {
          text-align: center;
          width: 500px;
          overflow: hidden;
        }
        .SearchResult__page {
          padding: 30px;
        }
      `}</style>
    </div>
  );
}
