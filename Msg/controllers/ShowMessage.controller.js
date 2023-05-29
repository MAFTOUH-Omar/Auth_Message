const msg=require('../models/Msg.model')

exports.getMsgWithUser = async (req, res, next) => {
    try {
      const message = await msg.find();
      res.status(200).json(message);
    } catch (error) {
      next(error);
    }
    
  };