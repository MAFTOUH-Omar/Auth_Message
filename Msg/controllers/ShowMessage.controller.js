const msg=require('../models/Msg.model')
const user=require('../../Auth/models/user.model')

exports.getMsgWithUser = async (req, res, next) => {
    try {
      const message = await msg.find().populate('user');
      res.status(200).json(message);
    } catch (error) {
      next(error);
    }
    
  };