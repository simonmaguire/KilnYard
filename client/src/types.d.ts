interface IUser {
  username: String;
  email: String;
  password: string;
}

interface IPot {
  _id: string;
  name: string;
  clay: string;
  category: string;
  stage: string;
  createdOn?: string;
  lastUpdate?: string;
}

interface PotProps {
  pot: IPot;
}

type ApiDataType = {
  message: string;
  status: string;
  pots: IPot[];
  pot?: IPotInfo;
  potCountFiltered: number;
};

type ApiLogginResponseType = {
  message: string;
  status: string;
  token: string;
  userId: string;
};

type ApiUserAuthType = {
  message: string;
  status: string;
  isLoggedIn: boolean;
  username: string;
  userId: string;
};

interface IPotInfo {
  _id: string;
  stage?: string;
  clay?: string;
  name?: string;
  category?: string;
  clay_weight?: string;
  throwing_height?: string;
  throwing_width?: string;
  throwing_notes?: string;
  throwing_pics?: File[];
  throwing_pic_ids?: string[];
  green_decorations?: string;
  trim_notes?: string;
  glazes?: string;
  glaze_notes?: string;
  result_height?: string;
  result_width?: string;
  result_notes?: string;
  result_pics?: File[];
  result_pic_ids?: string[];
  result_date?: string;
  throwing_date?: string;
  trim_date?: string;
}

interface SectionProps {
  potInfo: IPotInfo;
  // updateDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
