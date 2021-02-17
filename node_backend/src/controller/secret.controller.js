const db = require("../models");
const Secret = db.secret;
var Hash = require('object-hash');
const encrypt = require("../scripts");
var add = require('date-fns/add');


//* create a secret
exports.createsecret = (req, res) => {
  if (!req.body.secret) {
    res.status(400).send({ message: "Secret cannot be empty!"});
    return;
  }
  //const key = crypto.randomBytes(32); 
  // const iv = crypto.randomBytes(16);
  const hashed_secret = Hash(req.body.secret) // has secret
  const key = "HuzPEZgzqKOo8VwlnYhNUaPWTWSVDRQ2"; 
  const iv = "kg5ILA0826hrew5w" 
  const today = new Date() 
  const expires = add(today, { minutes: req.body.expireAfter}) 

  // * create an object
  const secret = new Secret({
    hash: `${hashed_secret}`,// hash of the string
    secretText: encrypt.encryptinformation(req.body.secret, key, iv), // secret text
    expiresAt: expires, // calculate expires at minutes
    remainingViews: req.body.expireAfterViews // remainingViews
  })

  // * Save new meet in the database
  secret
    .save(secret)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the secrets."
      });
    });
};

// * retrieve all meet from the database for that meeting.
exports.retrivesecret = (req, res) => {
  var condition = { hash: req.params.id }

  Secret.find(condition)
    .then(async (data) => { 
      //const key = crypto.randomBytes(32); 
      //const iv = crypto.randomBytes(16);
      const key = "HuzPEZgzqKOo8VwlnYhNUaPWTWSVDRQ2"; 
      const iv = "kg5ILA0826hrew5w" 
  
      // * if no data return
      if(data.length === 0){
        res.status(400).send("Missing data")
      } else {
                
      // * create response
      let response = {
        hash: data[0].hash,
        secretText: encrypt.decryptinformation(data[0].secretText, key, iv),
        expiresAt: data[0].expiresAt,
        remainingViews: data[0].remainingViews,
        createdAt: data[0].createdAt
      }

      // * calculate views
      const calculated_views = await updateremainingviews(data)
        
      // * If calculated views is greater than 0
      if(parseInt(calculated_views.remainingViews) === 0 || parseInt(calculated_views.remainingViews) > 0){
        res.send(response);
      } else {
        res.send("You have exhausted the number of views")
      }
    }
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving secrets."
      });
    });

};

// * update remaining views
const updateremainingviews = async (item) => {
  const response = await Secret.findByIdAndUpdate(item[0]._id, { remainingViews: parseInt(item[0].remainingViews) - 1 })
  return response
}