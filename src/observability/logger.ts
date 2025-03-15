import { createLogger, transports, format } from "winston";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const datadogApiKey = process.env.DATADOG_API_KEY || "";

const customDatadogTransport = new transports.Console({
  log(info, callback) {
    axios
      .post(
        `${process.env.URL_DATADOG}`,
        {
          ddsource: "nodejs",
          service: "my-service",
          ddtags: "env:production",
          message: info.message,
          level: info.level,
          timestamp: info.timestamp,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "DD-API-KEY": datadogApiKey,
          },
        }
      )
      .then(() => callback())
      .catch((error) => {
        console.error("Error sending log to Datadog:", error);
        callback();
      });
  },
});

const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.Console(), customDatadogTransport],
});

export default logger;
