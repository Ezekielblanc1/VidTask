if(process.env.NODE_ENV === 'production'){
  module.exports = {
    mongoURI: 'mongodb://Eazi:eazi12345@ds139775.mlab.com:39775/vidtask-prod'
  }
}else {
  module.exports = {
    mongoURI: 'mongodb://localhost:27017/vidtask' 
  }
}