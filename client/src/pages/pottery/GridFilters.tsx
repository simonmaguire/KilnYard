import { Form } from "react-bootstrap";
import { STAGE_OPTIONS, CATEGORY_OPTIONS } from "../potNotes/utility/Constants";

interface IGridFilters {
  stage: string | undefined;
  potType: string | undefined;
}

interface IGridFilterPopopProps {
  filters: IGridFilters;
  handleFilterChange: (newFilter: string, newFilterValue: string) => void;
  search: () => void;
}

export const GridFiltersPopop = ({
  filters,
  handleFilterChange,
}: IGridFilterPopopProps) => {
  const handleSelect = (e: any) => {
    handleFilterChange(e.target.name, e.target.value);
  };

  return (
    <div>
      <form id="grid-filters">
        <Form.Group className="filter">
          <Form.Label>Stage</Form.Label>
          <Form.Select
            aria-label="stage"
            className="tst2"
            name="stage"
            onChange={handleSelect}
            value={filters.stage}
          >
            <option value="">Any</option>
            {STAGE_OPTIONS.map((x, y) => (
              <option value={x} key={y}>
                {x}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="filter">
          <Form.Label>Type</Form.Label>
          <Form.Select
            aria-label="potType"
            className="tst2"
            name="potType"
            onChange={handleSelect}
            value={filters.potType}
          >
            <option value="">Any</option>
            {CATEGORY_OPTIONS.map((x, y) => (
              <option value={x} key={y}>
                {x}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </form>
    </div>
  );
};
