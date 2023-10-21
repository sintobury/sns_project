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

const onResponse = async (res: AxiosResponse) => {
  const originalConfig = res.config;
  if (res.data.statusCode === 401) {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/refresh`, {
        refreshToken: localStorage.getItem("refreshToken"),
      });
      if (res.status === 200) {
        localStorage.setItem("accessToken", res.data.result.accessToken);
        console.log("access refreshed");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.log("refresh expired");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
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
  } else if (res.data.statusCode === 405) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    alert("중복 로그인으로 인해 로그아웃 되었습니다.");
    window.location.replace("/");
  }
  return res;
};

const onErrorResponse = async (err: AxiosError | Error): Promise<AxiosError> => {
  const _err = err as unknown as AxiosError;
  // const { response } = _err;
  // const originalConfig = _err?.config;
  // if (response && response.status === 401) {
  //   try {
  //     console.log("access expired");
  //     const res = await axios.post(`${process.env.REACT_APP_API_URL}/refresh`, {
  //       refreshToken: localStorage.getItem("refreshToken"),
  //     });
  //     if (res.status === 200) {
  //       localStorage.setItem("accessToken", res.data.result.accessToken);
  //     }
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       if (error.response?.status === 401) {
  //         console.log("refresh expired");
  //         localStorage.removeItem("accessToken");
  //         localStorage.removeItem("refreshToken");
  //         localStorage.removeItem("Id");
  //         alert("로그인시간이 만료되었습니다.");
  //         window.location.replace("/");
  //       }
  //     }
  //   }
  //   const newAccessToken = localStorage.getItem("accessToken");
  //   if (originalConfig && originalConfig.headers) {
  //     originalConfig.headers.Authorization = `Bearer ${newAccessToken}`;
  //     return await axios(originalConfig);
  //   }
  // } else if (response && response.status === 406) {
  //   localStorage.removeItem("accessToken");
  //   localStorage.removeItem("refreshToken");
  //   localStorage.removeItem("Id");
  //   alert("다른곳에서 로그인되었습니다.");
  //   window.location.replace("/");
  // }
  return Promise.reject(_err);
};

const authinstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });
authinstance.interceptors.request.use(onRequest, onErrorRequest);
authinstance.interceptors.response.use(onResponse, onErrorResponse);

export const authInstance = authinstance;

export const defaultInstance = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}` });
