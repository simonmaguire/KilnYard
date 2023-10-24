import { Form } from "react-bootstrap";
import { SORT_BY_OPTIONS } from "../potNotes/utility/Constants";

interface ISortDropDownProps {
  sortedBy: ISortedByObject;
  handleChangeSort: (sortText: string) => void;
}

interface ISortedByObject {
  text: string;
  field: string;
  direction: number;
}

export const SortDropDown = ({
  handleChangeSort,
  sortedBy,
}: ISortDropDownProps) => {
  const handleSelectSort = (e: any) => {
    handleChangeSort(e.target.value);
  };

  return (
    <div id="sortDropDown">
      <form>
        <Form.Group className="form-group half-width">
          <Form.Label>Sorted By</Form.Label>
          <Form.Select
            aria-label="sort-by-selector"
            className="tst2"
            name="sortBy"
            onChange={handleSelectSort}
            value={sortedBy.text}
          >
            {SORT_BY_OPTIONS.map((x, y) => (
              <option value={x.text} key={y}>
                {x.text}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </form>
    </div>
  );
};
