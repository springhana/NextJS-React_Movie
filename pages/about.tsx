import Title from "@/components/Title";
import { useEffect, useRef, useState } from "react";
import info from "@/components/aboutInfo";

export default function About() {
  const refs: any = useRef([]);
  const setRef = (index: any) => (element: any) => {
    refs.current[index] = element; // 각 요소에 대한 참조 할당
  };
  const imgMove = (index: any) => {
    const currentRef = refs.current[index];
    if (currentRef.style.top === "240px") {
      refs.current[index].style.top = "0px";
      refs.current[index].style.opacity = "1";
    } else if (currentRef.style.top === "0px") {
      refs.current[index].style.top = "240px";
      refs.current[index].style.opacity = "0";
    }
  };

  return (
    <div className="about">
      <Title title="About" />
      {/* 배경 솜? 같은 것 */}
      <div className="home__shape-small"></div>
      <div className="home__shape-big"></div>

      <div className="logos">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png"
          className="img_react"
          alt="react"
        />
        <img
          src="https://cdn-icons-png.flaticon.com/512/748/748113.png"
          className="img_plus"
          alt="+"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nextjs-logo.svg/800px-Nextjs-logo.svg.png"
          className="img_nextjs"
          alt="nextJs"
        />
      </div>
      <div className="about_detail">
        <span>
          노마드코더의 Next.js 강의를 듣고 만든 React + Next.js 프로젝트 입니다.
        </span>
      </div>

      <ul className="info">
        {info.map((info, index) => (
          <div className="info_img_pic" onClick={() => imgMove(index)}>
            <div className="info_img">
              <span className="info__title">{info.title}</span>
              <a
                href={`${info.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="info__url"
              >
                {info.contain}
              </a>
            </div>
            <div className="info_inner">
              <li
                key={info.title}
                className="info_contain"
                ref={setRef(index)}
                style={{
                  transition: "0.5s ease-in-out",
                  top: "0",
                }}
              >
                <span className="info_inner__title">{info.title}</span>
                <img
                  src={`${info.img}`}
                  alt="image"
                  style={{ width: "100px", height: "100px" }}
                />
              </li>
            </div>
          </div>
        ))}
      </ul>
      <style jsx>{`
        ul li {
          list-style: none;
        }
        .about {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: hsl(2, 100%, 97%);
          height: 100vh;
          overflow: hidden;
        }
        .about_detail {
          margin: 30px 0;
          font-size: 30px;
          font-weight: bold;
        }
        .logos {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .img_react,
        .img_plus,
        .img_nextjs {
          margin: 0 20px;
        }
        .img_react {
          width: 150px;
          height: 150px;
        }
        .img_plus {
          width: 50px;
          height: 50px;
        }
        .img_nextjs {
          width: 350px;
          height: 150px;
        }
        .info {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 1200px;
          height: 300px;
          margin-bottom: -60px;
        }
        .info__title {
          position: absolute;
          bottom: 100px;
        }
        .info__url {
          text-decoration: none;
          font-size: 20px;
          font-weight: bold;
          color: #c8a2c8;
        }
        .info_img_pic {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 240px;
          height: 300px;
          text-align: center;
          margin: 10px;
        }
        .info_inner {
          position: relative;
          width: 100%;
          opacity: 1;
        }
        .info_contain {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 300px;
          background-color: #c8a2c8;
          border-radius: 5px;
          border: 5px solid #fff;
        }
        .info_contain:hover {
          z-index: 10;
          opacity: 1;
          animation: info_contain 0.5s infinite;
        }
        @keyframes info_contain {
          0% {
            margin-top: 0px;
          }
          25% {
            margin-top: 5px;
          }
          50% {
            margin-top: 10px;
          }
          75% {
            margin-top: 5px;
          }
          100% {
            margin-top: 0px;
          }
        }
        .info_img {
          position: absolute;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 210px;
          height: 300px;
          border: 5px solid white;
        }
        .info_inner__title {
          position: absolute;
          top: 0;
          margin-top: 30px;
          font-family: "DOSPilgiMedium";
        }

        .home__shape-small,
        .home__shape-mid,
        .home__shape-big {
          position: absolute;
          background-color: hsl(2, 100%, 80%);
          border-radius: 50%;
          overflow: hidden;
          filter: blur(80px);
        }
        .home__shape-small {
          width: 200px;
          height: 200px;
          top: 10rem;
          left: -5rem;
        }
        .home__shape-big {
          width: 200px;
          height: 200px;
          top: 20rem;
          right: -5rem;
        }
      `}</style>
    </div>
  );
}
