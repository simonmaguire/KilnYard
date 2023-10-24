import { DateTime } from "luxon";

//Needed to display in component
// utc added to prevent unexpected off-by 1 dates because of TZ manipulation by luxom
export const dateStringToComponentValue = (dateString: string | undefined) => {
  return dateString !== undefined && dateString !== ""
    ? DateTime.fromISO(dateString, { zone: "utc" }).toISODate() || undefined
    : "";
};

export const initialValuesAsStrings = (pot: IPotInfo) => {
  return {
    ...pot,
    throwing_width: pot.throwing_width || "",
    throwing_height: pot.throwing_height || "",
    clay_weight: pot.clay_weight || "",
    result_width: pot.result_width || "",
    result_height: pot.result_height || "",
    result_date: pot.result_date || "",
    throwing_date: pot.throwing_date || "",
    trim_date: pot.trim_date || "",
  };
};
