import { urlList } from "./config/urlList.js";
import { Worker } from "./classes/worker.js";
import { Mailer } from "./classes/mailer.js";
import { logger } from "./lib/log4js.js";

const main = async (dataList) => {
  let newArrivalList = [];
  const W = new Worker();
  const M = new Mailer();

  for (const data of dataList) {
    logger.info(data.name, ": " ,data.url, "の新着情報を取得します...");
    const newArrival = await W.fetchNewArrival(data);
    newArrivalList.push(newArrival);
  };

  await M.sendMail(newArrivalList);

  logger.info("all is done!");
};

main([urlList[0]]);
