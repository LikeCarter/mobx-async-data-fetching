import { makeAutoObservable } from "mobx";

class NewsStore {
  articles = new Map();

  constructor() {
    makeAutoObservable(this);
  }

  load = async (id) => {
    const response = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    );
    const data = await response.json();
    this.articles.set(id, data);
  };
}

export const newsStore = new NewsStore();
