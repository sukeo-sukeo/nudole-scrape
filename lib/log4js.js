import log4js from "log4js";
import { config } from "../config/log.config.js";

log4js.configure(config)

const logger = log4js.getLogger();

export { logger };