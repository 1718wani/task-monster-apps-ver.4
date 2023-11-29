import type { AxiosError, AxiosResponse } from "axios";

type customError = {
  error: string;
};

export const axiosErrorHandler = (res: AxiosResponse, error: AxiosError) => {
  if (error.response) {
    const status = error.response.status;
    let message = "予期せぬエラーが発生しました";

    if (status === 400) {
      message = "リクエストが不正です";
    } else if (status === 401) {
      message = "認証エラーが発生しました";
    } else if (status === 403) {
      message = "アクセス権限がありません";
    } else if (status === 404) {
      message = "リソースが見つかりません";
    } else if (status === 429) {
      const customeErrorData = error.response.data as customError;
      message = customeErrorData.error;
    } else if (status >= 500) {
      message = "サーバー側のエラーです";
    }

    return message;
  }

  return error.message;
};
