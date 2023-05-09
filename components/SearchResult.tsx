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
    <div>
      <div>
        Search Results for <b>{keyword}</b>
      </div>

      {results.length !== 0 ? (
        results.map((movie) => {
          return (
            <Link
              href={`/movies/${movie.original_title}/${movie.id}`}
              key={movie.id}
              legacyBehavior
            >
              <div>
                <div>
                  <div>
                    <Image
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt="poster"
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

                  <div>
                    <div>
                      {movie.original_title}
                      <br />
                      <span>
                        {movie.original_title !== movie.title
                          ? movie.title
                          : null}
                      </span>
                    </div>

                    <div>
                      {movie.release_date
                        ? movie.release_date.split("-")[0]
                        : null}
                    </div>
                  </div>
                </div>
                <Image
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

      {results.length != 0 ? (
        <Pagination
          type={`search/${keyword}`}
          page={parseInt(page)}
          totalPage={totalPage}
        />
      ) : null}
    </div>
  );
}
