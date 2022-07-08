const schema = {
  name: "",
  url: "",
  selector: "",
  getNewsFn: (elmsArray, baseUrl, name) => {
    return elmsArray.map((elm) => {
      const result = { id: "", url: "", title: "", name };
      return result;
    });
  },
};

const urlList = [
  {
    name: "日清食品",
    url: "https://www.nissin.com/jp/news/",
    selector: ".ns-posts-list-article-description",
    getNewsFn: (elmsArray, baseUrl, name) => {
      return elmsArray.map((elm) => {
        const result = {name};
        const href = elm.children[0].href;
        const id = href.split("/").reverse()[0];
        result.id = id;
        result.url = baseUrl + id;
        result.title = elm.children[0].children[1].children[0].textContent
          .replace(/ /g, "")
          .replace(/\n/g, "");
        return result;
      });
    },
  },
  {
    name: "東洋水産_マルちゃん",
    url: "https://www.maruchan.co.jp/",
    selector: ".list_2__text",
    getNewsFn: (elmsArray, baseUrl, name) => {
      return elmsArray.map((elm) => {
        const result = {name};
        const href = elm.children[0].href;
        const id = elm.children[0].textContent.replace(/\n/g, "");

        result.id = id;
        result.url = baseUrl + href;
        result.title = id;

        return result;
      });
    },
  },
];



export { urlList };