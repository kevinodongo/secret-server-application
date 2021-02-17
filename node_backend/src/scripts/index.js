const crypto = require("crypto");
const algorithm = "aes-256-cbc";

// encrypt data
exports.encryptinformation = (item, key ,iv) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(item, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

// decrypt data
exports.decryptinformation = (item, key ,iv) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  var decrypted = decipher.update(item, "hex", "utf8") + decipher.final("utf8");
  return decrypted;
};


