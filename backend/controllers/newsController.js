const News = require('../models/newsModel');
const mongoose = require('mongoose');

// GET all news
const getAllNews = async(req, res)=>{
    const allNews = await News.find().sort({createdAt: -1});

    res.status(200).json(allNews);   
}

// POST new news
const createNews = async (req, res)=>{
    const {title, summary, detailLink, image} = req.body.item;

    try {
      const news = await News.create({title, summary, detailLink, image});
      res.status(200).json(news);
    } catch (error) {
      res.status(400).json({error: error.message});
    }
}

// DELETE news
const deleteSingleNews = async(req, res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: 'No such news'})
    }

    const deleteNews = await News.findOneAndDelete({_id: id});
   
    if(!deleteNews){
        res.status(404).json({error: 'No such news'});
    }

    res.status(200).json({msg:'Deleted',deleteNews});
}



module.exports = {
    createNews,
    getAllNews,
    deleteSingleNews,
}