const express = require("express")
const router = express.Router()
const secret = require("../controller/secret.controller");

// create a new secret
router.post("/", secret.createsecret);

// retrieve a secret
router.get("/:id", secret.retrivesecret);

module.exports = router;