import { makeAutoObservable } from "mobx";

class NewsStore {
  article = {};

  constructor() {
    makeAutoObservable(this);
  }

  setArticle = (article) => {
    this.article = article
  }

  load = async (id) => {
    const response = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    );
    const data = await response.json();
    this.setArticle(data)
  }
}

export const newsStore = new NewsStore();
