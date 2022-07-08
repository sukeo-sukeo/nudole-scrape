import fs from "fs";
import fpath from "path";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = fpath.dirname(__filename);

import { util } from "../lib/util.js";
import { logger } from "../lib/log4js.js";

class Worker {
  async fetchNewArrival(data) {
    const { document } = await this.fetchDocument(data);
    const results = this.getNews(document, data);

    const savePath = `./data/${data.name}.json`;

    if (!fs.existsSync(savePath)) {
      fs.writeFileSync(savePath, JSON.stringify([{ id: 0 }]));
    }

    const newArrival = this.getNewArrival(results, savePath);

    logger.info("新着情報: ", newArrival);

    // 上書き
    fs.writeFileSync(`./data/${data.name}.json`, JSON.stringify(results));

    return newArrival;
  }

  async fetchDocument(data) {
    await util.sleep(1000);
    const res = await fetch(data.url);
    const html = await res.text();
    const { document } = new JSDOM(html).window;
    return { document };
  }

  getNews(document, data) {
    const selector = data.selector;
    const url = data.url;
    const name = data.name;

    const elms = document.querySelectorAll(selector);
    const elmsArray = Array.from(elms);

    const newsList = data.getNewsFn(elmsArray, url, name);
    return newsList;
  }

  getNewArrival(results, savePath) {
    const fileData = fs.readFileSync(savePath);
    const yesterday_data = JSON.parse(fileData);
    const id_list = yesterday_data.map((data) => data.id);
    const newArrival = results.filter((result) => !id_list.includes(result.id));
    return newArrival;
  }
}

export { Worker };
