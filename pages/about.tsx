import Title from "../components/Title";

export default function About() {
  return (
    <div>
      <Title title="About" />
      <div className="logos">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png"
          className="img_react"
        ></img>
        <img
          src="https://cdn-icons-png.flaticon.com/512/748/748113.png"
          className="img_plus"
        ></img>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nextjs-logo.svg/800px-Nextjs-logo.svg.png"
          className="img_nextjs"
        ></img>
      </div>
      <div>
        <span>
          노마드코더의 Next.js 강의를 토대로 만든 React + Next.js 실습 프로젝트
          입니다.
        </span>
      </div>
      <ul>
        <li>
          Lecture:
          <a href="https://nomadcoders.co/" target="_blank">
            NomadCoders.co
          </a>
        </li>
        <li>
          API:
          <a
            href="https://www.themoviedb.org/documentation/api"
            target="_blank"
          >
            The Movie Database
          </a>
        </li>
        <li>
          Icons:
          <a href="https://www.flaticon.com/" target="_blank">
            flaticon
          </a>
        </li>
        {/* <li>
          Github:
          <a href="https://github.com/yunuchoiii/next-movie" target="_blank">
            yunuchoiii/next-movie
          </a>
        </li> */}
      </ul>
    </div>
  );
}
