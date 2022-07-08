import { } from "dotenv/config";

const config = {
  smtpData: {
    host: "smtp.gmail.com", // Gmailのサーバ
    port: "465", // Gmailの場合 SSL: 465 / TLS: 587
    secure: true, // true = SSL
    auth: {
      user: process.env.MAIL_AUTH_USER, // メールアドレス（自身のアドレスを指定）
      pass: process.env.MAIL_AUTH_PASS, // アプリパスワード（アカウントのパスワードではない）
    },
  },
  mailToList: process.env.MAIL_TO_LIST.split(" "),
};

export { config };