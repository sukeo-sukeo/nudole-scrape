const util = {
  getDate: (deli = "-", want = "") => {
    const date = new Date();
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const H = date.getHours();
    const M = date.getMinutes();
    const S = date.getSeconds();

    const today = y + deli + m + deli + d;
    const nowTime = H + ":" + M + ":" + S;

    if (want === "time") return nowTime;
    if (want === "full") return today + "_" + nowTime;
    
    return today;

  },
  sleep: (time) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }
}

export { util };