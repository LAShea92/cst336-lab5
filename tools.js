const request = require('request');
const mysql = require('mysql');

module.exports = {

  /**
  * Return random image URLs from API
  * @param string keyword - search term
  * @param int imageCount - number of random images
  * @return array of image URLs
  */
  getRandomImages_cb: function (keyword, imageCount, cb){
    var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+"&client_id=291e7ffc1d623a2f66db3af154b448c658909cee880d4e8a9ae4ef50b454be35&orientation=landscape"
      request(requestURL, function (error, response, body) {
        if(!error){
          var parsedData = JSON.parse(body);
          //console.log("image url:", parsedData["urls"]["regular"]);
          var imageURLs = [];
          for(let i = 0; i < 9; i++){
            imageURLs.push(parsedData[i].urls.regular)
          }
          //console.log(imageURLs)
          //return imageURLs;
          callback(imageURLs);
        }
        else{
          console.log("error", error)
        }
      });//request  
  },

  /**
  * Return random image URLs from API
  * @param string keyword - search term
  * @param int imageCount - number of random images
  * @return array of image URLs
  */
  getRandomImages: function(keyword, imageCount){
    var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+"&client_id=291e7ffc1d623a2f66db3af154b448c658909cee880d4e8a9ae4ef50b454be35&orientation=landscape"
    return new Promise( function(resolve, reject){
      request(requestURL, function (error, response, body) {
        if(!error){
          var parsedData = JSON.parse(body);
          //console.log("image url:", parsedData["urls"]["regular"]);
          var imageURLs = [];
          
          for(let i = 0; i < imageCount; i++){
            imageURLs.push(parsedData[i].urls.regular)
          }
          //console.log(imageURLs)
          //return imageURLs;
          resolve(imageURLs);
        }
        else{
          console.log("error", error)
        }
      });//request
    });//promise
  },//function
  
  /**
  * creates database connection
  * @return db connection
  */
  createConnection: function(){
    var conn = mysql.createConnection({
       host: "localhost",
       user: "root",
       password: "", 
       database: "img_gallery"
//  			 host: "us-cdbr-iron-east-02.cleardb.net",
//        user: "bfd091ead737ce",
//        password: "70657166", 
//        database: "heroku_9c1ef6a58cc3025"
    });
    return conn;
  }//connection
}