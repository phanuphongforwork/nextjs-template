import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const appConfig = {
  baseUrl: publicRuntimeConfig.app.baseUrl || "http://127.0.0.1/:3333",
};
