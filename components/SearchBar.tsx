import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

export default function SearchBar() {
  const [inputValue, setInputValue] = useState<string>("");
  const router = useRouter();
  const onSearchClick = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && inputValue !== "") {
      router.push(`/search/${inputValue}/1`);
      setInputValue("");
    }
  };

  return (
    <div className="search">
      <div className="search_inner">
        <input
          type="text"
          className="search__input"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
          onKeyUp={onSearchClick}
          value={inputValue}
        />
        <Link
          href={inputValue != "" ? `/search/${inputValue}/1` : "/"}
          onClick={() => setInputValue("")}
        >
          <button className="search__button">
            <svg
              className="search__icon"
              aria-hidden="true"
              viewBox="0 0 24 24"
            >
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
          </button>
        </Link>
      </div>

      <style jsx>{`
        .search {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .search_inner {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          right: 0;
          margin-right: 400px;
          padding: 0 15px;
          background-color: hsl(2, 100%, 95%);
          border-radius: 20px;
        }
        .search__button {
          position: relative;
          border: none;
          background-color: transparent;
          margin-top: 0.1em;
          right: 100px;
          height: 50px;
          right: 0px;
        }
        .search__button:hover {
          cursor: pointer;
        }
        .search__input {
          width: 30px;
          height: 30px;
          transition: 0.5s ease-out;
          text-align: center;
          border-radius: 30px;
          background: hsl(2, 100%, 98%);
          border: none;
        }
        .search__input:focus {
          width: 200px;
        }
        .search__icon {
          height: 1.3em;
          width: 1.3em;
          margin-left: 5px;
        }
      `}</style>
    </div>
  );
}
