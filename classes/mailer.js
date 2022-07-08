import { config } from "../config/mail.config.js";
import mailer from "nodemailer";
import { logger } from "../lib/log4js.js";

class Mailer {
  async sendMail(dataList) {
    const mainText = this.createText(dataList);
    try {
      const result = await this.send(mainText);
      logger.info("mail send done!");
      logger.info(result);
    } catch (e) {
      logger.error("mail is lost...: ", e);
    }
  }

  async send(value) {
    const smtpData = config.smtpData;
    const mailData = this.createMailData(value)
    const transporter = mailer.createTransport(smtpData);
    const result = await transporter.sendMail(mailData);
    
    return result;
  };
  
  createMailData(value) {
    const mailData = {
      from: "nudle-info",
      to: config.mailToList,
      subject: "【新着！】ヌードル情報",
      text: value
    }

    return mailData;
  }

  createText(dataList) {
    let text;
    dataList = dataList.filter(data => data.length);
    if (dataList.length) {
      text = dataList
        .map((data) => {
          const name = data[0].name;
          const contents = data.map(d => `${d.title}\nlink: ${d.url}\n`);
          return `■■■${name}■■■\n${contents}\n`;
        })
        .flat()
        .join(",")
        .replace(/,/g, "\n");
    } else {
      text = `新着情報はありませんでした!`
    }

    return `本日の新着ヌードル情報！\n\n${text}`;
  }

}

export { Mailer };