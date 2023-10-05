import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  if (!config.headers) {
    return config;
  }
  config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
  return config;
};

const onErrorRequest = (err: AxiosError | Error) => {
  return Promise.reject(err);
};

const onResponse = (res: AxiosResponse) => {
  return res;
};

const onErrorResponse = async (err: AxiosError | Error): Promise<AxiosError> => {
  const _err = err as unknown as AxiosError;
  const { response } = _err;
  const originalConfig = _err?.config;

  if (response && response.status === 401) {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/refresh`, {
        headers: {
          Refresh: localStorage.getItem("refreshToken"),
        },
      });
      if (res.status === 200) {
        localStorage.setItem("accessToken", res.headers["authorization"]);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("Id");
          alert("로그인시간이 만료되었습니다.");
          window.location.replace("/");
        }
      }
    }
    const newAccessToken = localStorage.getItem("accessToken");
    if (originalConfig && originalConfig.headers) {
      originalConfig.headers.Authorization = `Bearer ${newAccessToken}`;
      return await axios(originalConfig);
    }
  } else if (response && response.status === 406) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("Id");
    alert("다른곳에서 로그인되었습니다.");
    window.location.replace("/");
  }
  return Promise.reject(_err);
};

const authinstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });
authinstance.interceptors.request.use(onRequest, onErrorRequest);
authinstance.interceptors.response.use(onResponse, onErrorResponse);

export const authInstance = authinstance;

export const defaultInstance = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}` });
