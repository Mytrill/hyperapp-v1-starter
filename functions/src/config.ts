export type Environment = "dev" | "prod"

export interface Config {
  ENVIRONMENT: Environment
}

export const config: Config = require("../config/dev")
