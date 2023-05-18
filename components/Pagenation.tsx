import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

interface PropsType {
  type: string;
  page: number;
  totalPage: number;
}

export default function Pagination(props: PropsType) {
  const router = useRouter();
  const [firstPage, setFirstPage] = useState<number>(1);
  const [pages, setPages] = useState<number[]>([]);
  const currentPage: number = props.page;
  const totalPage: number = props.totalPage;

  const onPageClick = (page: number) => {
    router.push(`/${props.type}/${page}`);
  };

  useEffect(() => {
    const firstPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
    // console.log(firstPage);
    let pagesArr = [];

    for (let i = 0; i < 5; i++) {
      if (firstPage + i <= totalPage) {
        pagesArr.push(firstPage + i);
      }
    }
    setFirstPage(firstPage);
    setPages(pagesArr);
  }, [currentPage, totalPage]);

  return (
    <div className="pagenation">
      <ul>
        {firstPage === 1 ? (
          <li className="pages__Btn" style={{ opacity: "0.5" }}>
            prev
          </li>
        ) : (
          <li
            onClick={() => {
              onPageClick(firstPage - 5);
            }}
            className="pages__Btn"
          >
            prev
          </li>
        )}
      </ul>

      {pages.map((page) => {
        return (
          <li
            key={page}
            onClick={() => {
              onPageClick(page);
            }}
          >
            <div
              className={
                currentPage == page
                  ? "Pagenation__pageCheck"
                  : "Pagenation__page"
              }
            >
              {page}
            </div>
          </li>
        );
      })}

      {pages.length === 5 ? (
        <li
          className="pages__Btn"
          onClick={() => {
            onPageClick(firstPage + 5);
          }}
        >
          next
        </li>
      ) : (
        <li className="pages__Btn" style={{ opacity: "0.5" }}>
          next
        </li>
      )}

      <style jsx>{`
        .pagenation {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          list-style: none;
          textalign: center;
          gap: 50px;
          cursor: pointer;
        }
        .pages__Btn {
          list-style: none;
        }
        .Pagenation__page,
        .Pagenation__pageCheck {
          width: 30px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          transition: 0.2s ease-in-out;
        }

        .Pagenation__page:hover,
        .Pagenation__pageCheck:hover {
          position: relative;
          border-radius: 50%;
          background-color: tomato;
          color: white;
        }
        .Pagenation__pageCheck {
          border-radius: 50%;
          background-color: rgb(213, 45, 15);
          color: white;
        }
      `}</style>
    </div>
  );
}
