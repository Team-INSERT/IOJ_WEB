import { resolve as _resolve } from "path";

export const resolve = {
  extensions: [".js", ".jsx", ".ts", ".tsx"],
  alias: {
    "@": _resolve(__dirname, "./src"), // TypeScript의 baseUrl과 일치해야 합니다.
  },
};
export const module = {
  rules: [
    // TypeScript 로더 설정
    {
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "ts-loader",
      },
    },
  ],
};
