import { BsArrowRightCircle, BsArrowLeftCircle } from "react-icons/bs";
// import { useSearchParams } from "react-router-dom";

interface IPaginationProps {
  page: number;
  potsOnPage: number;
  potCount: number;
  changePage: (newPage: number) => void;
}
const POTS_PER_PAGE = 20;

const constructDisplayMessage = (
  page: number,
  potsOnPage: number,
  potCount: number
) => {
  let msg = "Showing pot";
  let firstPot = (page - 1) * POTS_PER_PAGE + 1;
  if (potsOnPage !== 1) {
    msg += `s ${firstPot} - ${firstPot + potsOnPage - 1} of ${potCount}`;
  } else {
    msg += ` ${firstPot}  of ${potCount}`;
  }
  return msg;
};

export const Pagination = ({
  page,
  potsOnPage,
  potCount,
  changePage,
}: IPaginationProps) => {
  // const [queryParameters, setQueryParameters] = useSearchParams();
  const totalPages = Math.ceil(potCount / POTS_PER_PAGE);

  let displayMSG = constructDisplayMessage(page, potsOnPage, potCount);

  return (
    <div id="pagination-group">
      {totalPages > 1 && (
        <div id="pagination">
          {page != 1 && (
            <BsArrowLeftCircle
              className="pagination-arrow"
              onClick={() => changePage(page - 1)}
            />
          )}
          <p onClick={() => changePage(1)}>1</p>
          {page - 1 > 3 && <p>...</p>}
          {page - 2 > 1 && (
            <p onClick={() => changePage(page - 2)}>{page - 2}</p>
          )}
          {page - 1 > 1 && (
            <p onClick={() => changePage(page - 1)}>{page - 1}</p>
          )}
          {page !== 1 && page !== totalPages && (
            <p className="active-page">{page}</p>
          )}
          {page + 1 < totalPages && (
            <p onClick={() => changePage(page + 1)}>{page + 1}</p>
          )}
          {page + 2 < totalPages && (
            <p onClick={() => changePage(page + 2)}>{page + 2}</p>
          )}
          {totalPages - page > 3 && <p>...</p>}
          <p onClick={() => changePage(totalPages)}>{totalPages}</p>
          {page !== totalPages && (
            <BsArrowRightCircle
              className="pagination-arrow"
              onClick={() => changePage(page + 1)}
            />
          )}
        </div>
      )}
      {potCount >= 0 ? <p id="pagination-txt">{displayMSG}</p> : null}
    </div>
  );
};
