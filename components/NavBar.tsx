import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import SearchBar from "./SearchBar";
import styles from "../styles/css/Layout.module.css";

export default function NavBar() {
  const router = useRouter();
  const [movie, setMovie] = useState<string>("Movie"); // 영화 종류
  const [isToggled, setIsToggled] = useState<boolean>(false); // 영화 종류 토글

  return (
    <div className={styles.NavBar}>
      {/* 솜? 같은 것 */}
      <div className={styles.home__shape_small}></div>

      {/* 정보 */}
      <div
        onClick={() => {
          setMovie("Movie");
          setIsToggled(false);
        }}
      >
        <Link href="/" className={`${styles.link} ${styles.NavBar_logo}`}>
          Mext
        </Link>
        <Link
          href="/"
          className={`${styles.link} ${
            router.pathname === "/" ? styles.active : ""
          }`}
          style={{ fontSize: "30px" }}
        >
          Home&nbsp;
        </Link>
        |
        <Link
          href="/about"
          className={`${styles.link} ${
            router.pathname === "/about" ? styles.active : ""
          }`}
          style={{ fontSize: "30px" }}
        >
          &nbsp;About
        </Link>
      </div>

      <div>
        <SearchBar />
      </div>

      {/* 영화 종류 */}
      <div
        onClick={() => setIsToggled(!isToggled)}
        className={styles.NavBar_Movie}
      >
        {isToggled ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Link
              href="/popular/1"
              className={`${styles.link} ${styles.NavBar_Movie_type} ${
                router.pathname === "/popular" ? styles.active : ""
              }`}
              onClick={() => setMovie("Popular")}
              style={{
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            >
              Popular
            </Link>
            <Link
              href="/now_playing/1"
              className={`${styles.link} ${styles.NavBar_Movie_type} ${
                router.pathname === "/now_playing" ? styles.active : ""
              }`}
              onClick={() => setMovie("Now In Theaters")}
            >
              Now In Theaters
            </Link>
            <Link
              href="/top_rated/1"
              className={`${styles.link} ${styles.NavBar_Movie_type} ${
                router.pathname === "/top_rated" ? styles.active : ""
              }`}
              onClick={() => setMovie("Top Rated")}
              style={{
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
              }}
            >
              Top Rated
            </Link>
          </div>
        ) : (
          <div className={styles.NavBar_Movie_type}>{movie}</div>
        )}
      </div>
    </div>
  );
}
