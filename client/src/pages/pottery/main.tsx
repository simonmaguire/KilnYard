import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import PotteryCardGrid from "./PotteryCardGrid";
import "./pottery.css";
import Options from "./options";
import { getPots, deletePot } from "../../API";
import { useNavigate } from "react-router-dom";
import { GridFiltersPopop } from "./GridFilters";
import { Pagination } from "./pagination";
import { SortDropDown } from "./SortDropDown";
import { SORT_BY_OPTIONS } from "../potNotes/utility/Constants";
import { Spinner } from "react-bootstrap";

interface ISortedByObject {
  text: string;
  field: string;
  direction: number;
}

interface IGridFilters {
  stage: string | undefined;
  potType: string | undefined;
}

const Main = () => {
  const navigate = useNavigate();
  // const [queryParameters, setQueryParameters] = useSearchParams();

  const queryParameters = new URLSearchParams(window.location.search);
  const urlStage = queryParameters.get("stage");
  const urlPotType = queryParameters.get("potType");

  const [page, setPage] = useState<number>(
    1
    // parseInt(queryParameters.get("page") || "1")
  );

  const [filters, setFilters] = useState<IGridFilters>({
    stage: urlStage || undefined,
    potType: urlPotType || undefined,
  });

  const [potCount, setPotCount] = useState<number>(0);
  const [pots, setPots] = useState<IPot[]>([]);
  const [loadingPots, setLoadingPots] = useState(true);
  const [sortedBy, setSortedBy] = useState<ISortedByObject>(SORT_BY_OPTIONS[0]);

  useEffect(() => {
    fetchPots();
  }, [page, sortedBy, filters]);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };
  const handleStortedByChange = (value: string) => {
    let newSort = SORT_BY_OPTIONS.find((x) => x.text == value) || sortedBy;
    setSortedBy(newSort);
  };
  //If i can get state to change on url chage I'd change this to set query params
  const handleFilterChange = (newFilter: string, newFilterValue: string) => {
    setFilters({ ...filters, [newFilter]: newFilterValue });
  };

  const fetchPots = (): void => {
    setLoadingPots(true);
    getPots(filters, page, sortedBy)
      .then(({ data: { pots, potCountFiltered } }) => {
        setPots(pots);
        setPotCount(potCountFiltered);
        setLoadingPots(false);
      })
      .catch(() => {
        //this navigate is a pretty wild assumption and not necessarily where I want to check for login
        navigate("/login", { relative: "route" });
      });
  };

  const handleDeletePot = (_id: string): void => {
    setLoadingPots(true);
    deletePot(_id).then(() => {
      fetchPots();
    });
  };

  return (
    <Container id="Main">
      <div id="grid-header">
        <GridFiltersPopop
          filters={filters}
          handleFilterChange={handleFilterChange}
          search={fetchPots}
        />

        <SortDropDown
          sortedBy={sortedBy}
          handleChangeSort={handleStortedByChange}
        />
      </div>
      {loadingPots ? (
        <Spinner
          id="loading-spinner"
          animation="border"
          variant="primary"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div>
          {potCount != 0 ? (
            <div>
              <PotteryCardGrid
                pots={pots}
                handleDeletePot={handleDeletePot}
                loadingPots={loadingPots}
              ></PotteryCardGrid>
              <Pagination
                page={page}
                potsOnPage={pots.length}
                potCount={potCount}
                changePage={handleChangePage}
              ></Pagination>
            </div>
          ) : (
            <h2>No Pots Found</h2>
          )}

          <Options></Options>
        </div>
      )}
    </Container>
  );
};

export default Main;
