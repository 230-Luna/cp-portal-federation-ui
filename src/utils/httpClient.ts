import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { FEDERATION_API_BASE_URL } from "@/config/config";

interface FederationHttpClient extends AxiosInstance {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
}

const config: AxiosRequestConfig = {
  baseURL: FEDERATION_API_BASE_URL,
  headers: {},
};

function createHttpClient() {
  const axiosInstance = axios.create(config);

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem("token");

      if (token) {
        if (config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } else {
        // token 재발급?
      }

      return config;
    },
    (error) => {
      if (error.message === "Network Error") {
        console.error("서버에 연결할 수 없습니다. 네트워크 상태를 확인하세요.");
      } else if (error.response && error.response.status === 400) {
        console.error("잘못된 요청입니다. 요청 형식을 확인해주세요.");
      } else if (error.response && error.response.status === 404) {
        console.error("요청한 API 엔드포인트를 찾을 수 없습니다.");
      } else {
        console.error("알 수 없는 오류가 발생했습니다.");
      }

      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => {
      if (error.response) {
        if (error.response.status === 401) {
          console.error("토큰이 만료되었거나 유효하지 않습니다.");
        } else if (error.response.status === 500) {
          console.error(`예상치 못한 오류 발생: ${error.response.status}`);
        }
      } else {
        console.error("서버에 응답이 없습니다. 네트워크 상태를 확인하세요.");
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
}

export const httpClient: FederationHttpClient = createHttpClient();

// error code
// 200
// 400
// 401
// 403
// 404
// 500
