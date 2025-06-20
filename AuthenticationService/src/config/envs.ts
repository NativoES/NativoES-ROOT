import "dotenv/config";

import { get } from "env-var";

export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  MONGO_URL: get("MONGODB_URI").required().asString(),
  AWS_BUCKET_NAME: get("AWS_BUCKET_NAME").required().asString(),
  AWS_ACCESS_KEY_ID: get("AWS_ACCESS_KEY_ID").required().asString(),
  AWS_SECRET_ACCESS_KEY: get("AWS_SECRET_ACCESS_KEY").required().asString(),
  AWS_REGION: get("AWS_REGION").required().asString(),
  UNIMTX_ACCESS_KEY_ID: get("UNIMTX_ACCESS_KEY_ID").required().asString(),
  JWT_SEED: get("JWT_SECRET").required().asString()
}