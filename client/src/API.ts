import axios, { AxiosResponse } from "axios";

const baseUrl: string = "http://localhost:3001";

interface IFilters {
  stage: string | undefined;
}

export const login = async (formData: {
  username: string;
  password: string;
}): Promise<AxiosResponse<ApiLogginResponseType>> => {
  try {
    const loginResponse: AxiosResponse<ApiLogginResponseType> =
      await axios.post(`${baseUrl}/login`, formData, { withCredentials: true });
    return loginResponse;
  } catch (error) {
    throw error;
  }
};

export const logout = async (): Promise<
  AxiosResponse<ApiLogginResponseType>
> => {
  try {
    const logoutMsg: AxiosResponse<ApiLogginResponseType> = await axios.get(
      `${baseUrl}/logout`,
      { withCredentials: true }
    );
    return logoutMsg;
  } catch (error) {
    throw error;
  }
};

export const register = async (
  formData: IUser
): Promise<AxiosResponse<ApiLogginResponseType>> => {
  try {
    const registrationMsg: AxiosResponse<ApiLogginResponseType> =
      await axios.post(`${baseUrl}/register`, formData, {
        withCredentials: true,
      });
    return registrationMsg;
  } catch (error) {
    throw error;
  }
};

export const isUserAuth = async (): Promise<AxiosResponse<ApiUserAuthType>> => {
  // try {
  const registrationMsg: AxiosResponse<ApiUserAuthType> = await axios.get(
    `${baseUrl}/isUserAuth`,
    { withCredentials: true }
  );
  return registrationMsg;
  // }
  // catch (error) {
  //   throw error;
  // }
};

export const getPots = async (
  filters: IFilters,
  page: number,
  sortedBy: any
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const potResults: AxiosResponse<ApiDataType> = await axios.get(
      baseUrl + `/pots/`,
      {
        params: {
          ...filters,
          page: page,
          sortedBy: sortedBy.field,
          sortDirection: sortedBy.direction,
        },
        withCredentials: true,
      }
    );
    return potResults;
  } catch (error) {
    throw error;
  }
};

export const getPot = async (
  _id: string
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const pot: AxiosResponse<ApiDataType> = await axios.get(
      `${baseUrl}/pots/${_id}`,
      { withCredentials: true }
    );
    return pot;
  } catch (error) {
    throw error;
  }
};

export const addPot = async (
  formData: FormData
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const savePot: AxiosResponse<ApiDataType> = await axios.post(
      baseUrl + "/create-pot",
      formData,
      { withCredentials: true }
    );
    return savePot;
  } catch (error) {
    throw error;
  }
};

export const updatePot = async (
  pot: FormData
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const updatedPot: AxiosResponse<ApiDataType> = await axios.put(
      `${baseUrl}/update-pot/${pot.get("_id")}`,
      pot,
      { withCredentials: true }
    );
    return updatedPot;
  } catch (error) {
    throw error;
  }
};

export const deletePot = async (
  _id: string
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const deletedPot: AxiosResponse<ApiDataType> = await axios.delete(
      `${baseUrl}/delete-pot/${_id}`,
      { withCredentials: true }
    );
    return deletedPot;
  } catch (error) {
    throw error;
  }
};
