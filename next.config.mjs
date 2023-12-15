/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    domains: ["https://obayjoneljbejpaiqzhz.supabase.co"],
  },

  /**
   * If you are using `appDir` then you must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  headers: async () => {
    return Promise.resolve( [
      {
        // 対象APIのパスパターン
        // 今回は src/app/api/ 配下にAPIを作っているので下記のようにする
        source: "/api/:path*",
        headers: [
          {
            // CORSを許可するオリジン
            key: "Access-Control-Allow-Origin",
            value: "https://monster-todo-app-1718wani.vercel.app/",
          },
          {
            // 許可するメソッド
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            // 許可するリクエストヘッダ
            key: "Access-Control-Allow-Headers",
            value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ]);
  },

};
// わからない
export default config;
