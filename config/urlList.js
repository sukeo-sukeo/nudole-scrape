import { util } from "../lib/util.js";

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
    name: "サンポー食品",
    url: "https://www.sanpofoods.co.jp/",
    selector: ".top_news_cont",
    getNewsFn: (elmsArray, baseUrl, name) => {
      return elmsArray.map((elm) => {
        const result = { id: "", url: "", title: "", name };
        let title = elm.children[2].textContent;
        title = util.replacer(title);

        result.id = title;
        result.url = elm.children[2].children[0].href;
        result.title = title
        return result;
      });
    },
  },
  {
    name: "寿がきや",
    url: "https://www.sugakiya.co.jp/",
    selector: ".products",
    getNewsFn: (elmsArray, baseUrl, name) => {
      return elmsArray.map((elm) => {
        const result = { id: "", url: "", title: "", name };
        let title = elm.children[1].textContent;
        title = util.replacer(title);

        result.id = title;
        result.url = baseUrl + elm.href;
        result.title = title;

        return result;
      });
    },
  },
  {
    name: "日清食品",
    url: "https://www.nissin.com/jp/news/",
    selector: ".ns-posts-list-article-description",
    getNewsFn: (elmsArray, baseUrl, name) => {
      return elmsArray.map((elm) => {
        const result = { name };
        const href = elm.children[0].href;
        const id = href.split("/").reverse()[0];
        let title = elm.children[0].children[1].children[0].textContent;
        title = util.replacer(title);

        result.id = id;
        result.url = baseUrl + id;
        result.title = title;
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
        const result = { name };
        const href = elm.children[0].href;
        let title = elm.children[0].textContent;
        title = util.replacer(title);

        result.id = title;
        result.url = baseUrl + href;
        result.title = title;

        return result;
      });
    },
  },
  {
    name: "サンヨー食品_サッポロ一番",
    url: "https://www.sanyofoods.co.jp/",
    selector: ".mypattern",
    getNewsFn: (elmsArray, baseUrl, name) => {
      return elmsArray
        .map((elm) => {
          const elms = elm.children;
          return [...elms].map((elm) => {
            const result = { id: "", url: "", title: "", name };
            console.log(elm.children[0].children[1]);
            const title = elm.children[0].children[1].textContent;

            result.id = title;
            result.url = elm.children[0].href;
            result.title = title;
            return result;
          });
        })
        .flat();
    },
  },
];



export { urlList };