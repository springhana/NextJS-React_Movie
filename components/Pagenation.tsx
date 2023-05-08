import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface PropsType {
  type: string;
  page: number;
  totalPage: number | undefined;
}

export default function Pagination(props: PropsType) {
  const router = useRouter();
  const [firstPage, setFirstPage] = useState(1);
  const [pages, setPages] = useState<number[]>([]);
  const currentPage = props.page;
  let totalPage = props.totalPage;

  const onPageClick = (page: number) => {
    router.push(`/${props.type}/${page}`);
  };

  useEffect(() => {
    if (totalPage === undefined) {
      totalPage = 0;
    }

    const firstPage = ((currentPage - 1) / 5) * 5 + 1;
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
    <div>
      <ul>
        {firstPage === 1 ? (
          <li
            onClick={() => {
              onPageClick(firstPage - 5);
            }}
          >
            prev
          </li>
        ) : (
          <li>prev</li>
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
            <div>{page}</div>
          </li>
        );
      })}
      {pages.length === 5 ? (
        <li
          onClick={() => {
            onPageClick(firstPage + 5);
          }}
        >
          next
        </li>
      ) : null}
    </div>
  );
}
