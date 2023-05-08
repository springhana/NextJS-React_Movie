import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import styles from "../styles/css/Layout.module.css";

export default function NavBar() {
  const router = useRouter();
  const [movie, setMovie] = useState<string>("Movie");
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div className={styles.NavBar}>
      <div
        onClick={() => {
          setMovie("movie");
          setIsToggled(false);
        }}
      >
        <Link href="/" className={`${styles.link} ${styles.NavBar_logo}`}>
          Logo
        </Link>
        <Link
          href="/"
          className={`${styles.link} ${
            router.pathname === "/" ? styles.active : ""
          }`}
        >
          Home
        </Link>

        <Link
          href="/about"
          className={`${styles.link} ${
            router.pathname === "/about" ? styles.active : ""
          }`}
        >
          About
        </Link>
      </div>

      <div>
        <SearchBar />
      </div>

      <div
        onClick={() => setIsToggled(!isToggled)}
        className={styles.NavBar_Movie}
      >
        {isToggled ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Link
              href="/popular/1"
              className={`${styles.link} ${
                router.pathname === "/popular" ? styles.active : ""
              }`}
              onClick={() => setMovie("Popular")}
            >
              Popular
            </Link>

            <Link
              href="/now_playing/1"
              className={`${styles.link} ${
                router.pathname === "/now_playing" ? styles.active : ""
              }`}
              onClick={() => setMovie("Now In Theaters")}
            >
              Now In Theaters
            </Link>

            <Link
              href="/top_rated/1"
              className={`${styles.link} ${
                router.pathname === "/top_rated" ? styles.active : ""
              }`}
              onClick={() => setMovie("Top Rated")}
            >
              Top Rated
            </Link>
          </div>
        ) : (
          <div>{movie}</div>
        )}
      </div>
    </div>
  );
}
