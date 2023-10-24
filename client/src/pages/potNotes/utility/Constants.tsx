export const BLANK_POT: IPotInfo = {
  _id: "",

  stage: "",
  clay: "",
  name: "",
  category: "",
  clay_weight: "",
  throwing_height: "",
  throwing_width: "",
  throwing_notes: "",
  throwing_pics: [],
  throwing_pic_ids: [],
  green_decorations: "",
  trim_notes: "",
  glazes: "",
  glaze_notes: "",
  result_height: "",
  result_width: "",
  result_notes: "",
  result_pics: [],
  result_pic_ids: [],
  result_date: "",
  throwing_date: "",
  trim_date: "",
};

export const CATEGORY_OPTIONS: string[] = [
  "Mug",
  "Bowl",
  "Cup",
  "Planter",
  "Plate",
  "Vase",
];

export const STAGE_OPTIONS: string[] = [
  "Wet",
  "Leather Hard",
  "Dry",
  "Bisque",
  "Glazed Bisque",
  "Glaze Ware",
];

export const SORT_BY_OPTIONS = [
  {
    text: "Created - Newest First",
    field: "createdAt",
    direction: -1,
  },
  {
    text: "Created - Oldest First",
    field: "createdAt",
    direction: 1,
  },
  {
    text: "Last Updated - Most Recent First",
    field: "updatedAt",
    direction: -1,
  },
];
