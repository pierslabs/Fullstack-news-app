const NewsService = require("../services/news.service.js");
const { validationResult } = require("express-validator");

module.exports.seedNews = async (req, res) => {
  try {
    await NewsService.instance().insertSeedProvider();
    res.status(201).json("Seeds insert in DB successfully.");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports.getNews = async (req, res) => {
  try {
    const allNews = await NewsService.instance().getNews();
    res.status(200).json(allNews);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

module.exports.createNew = async (req, res) => {
  try {
    const { errors } = validationResult(req);
    if (errors.length > 0) return res.status(400).json(errors);

    const getProviderNews = await NewsService.instance().createNew(req.body);
    res.status(201).json(getProviderNews);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports.archiveNew = async (req, res) => {
  const { errors } = validationResult(req);
  if (errors.length > 0) return res.status(400).json(errors);
  try {
    const newsServiceArchive = await NewsService.instance().archiveNew(
      req.params.id
    );
    res.status(200).json(newsServiceArchive);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports.updateNew = async (req, res) => {
  const { errors } = validationResult(req);
  if (errors.length > 0) return res.status(400).json(errors);
  try {
    const newsServiceUpdate = await NewsService.instance().updateNew(
      req.params.id,
      req.body
    );
    res.status(200).json(newsServiceUpdate);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports.deleteNew = async (req, res) => {
  const { errors } = validationResult(req);
  if (errors.length > 0) return res.status(400).json(errors);
  try {
    await NewsService.instance().deleteNew(req.params.id);
    res.status(204);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
