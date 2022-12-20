const News = require("../models/news.model.js");
const fs = require("fs");
const { default: mongoose } = require("mongoose");

class NewsService {
  static instance() {
    if (!NewsService._instance) {
      NewsService._instance = new NewsService();
    }
    return NewsService._instance;
  }

  async getNewById(id) {
    const getNew = await News.findById(id);
    if (!getNew) throw new Error("New not found");
    return getNew;
  }

  async getNews() {
    return await News.find().sort([["date", "descending"]]);
  }

  async insertSeedProvider() {
    const providerBuffer = fs.readFileSync(
      `${__dirname}/../../../news-provider/fake-news.provider.json`
    );

    const allProviderNews = JSON.parse(providerBuffer);

    const cleanFieldsAllProvidersNews = [];
    allProviderNews.map((item) => {
      item = {
        ...item,
        date: item.publishedAt,
      };
      delete item.source;
      delete item.url;
      delete item.urlToImage;
      delete item.publishedAt;

      cleanFieldsAllProvidersNews.push(item);
    });

    const news = mongoose.model("news");
    return news.insertMany(cleanFieldsAllProvidersNews);
  }

  async createNew(args) {
    const newNew = new News(args);
    return await newNew.save();
  }

  async archiveNew(id) {
    const getNew = await this.getNewById(id);

    const archiveDate = !getNew.archiveDate ? new Date() : null;

    if (!getNew) throw new Error("New not found");

    const patchNew = await News.updateOne(
      { _id: { $eq: id } },
      {
        $set: { archiveDate },
      }
    );

    return patchNew;
  }

  async updateNew(id, args) {
    await this.getNewById(id);
    return await News.findByIdAndUpdate(id, args, { new: true });
  }

  async deleteNew(id) {
    await this.getNewById(id);
    return await News.findByIdAndRemove(id);
  }
}

module.exports = NewsService;
