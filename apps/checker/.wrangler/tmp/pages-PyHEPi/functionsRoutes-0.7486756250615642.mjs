import { onRequestOptions as __api___route___js_onRequestOptions } from "/home/rena/.gemini/antigravity/scratch/riuph-cloud-services/apps/checker/functions/api/[[route]].js"
import { onRequest as __api___route___js_onRequest } from "/home/rena/.gemini/antigravity/scratch/riuph-cloud-services/apps/checker/functions/api/[[route]].js"

export const routes = [
    {
      routePath: "/api/:route*",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api___route___js_onRequestOptions],
    },
  {
      routePath: "/api/:route*",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api___route___js_onRequest],
    },
  ]