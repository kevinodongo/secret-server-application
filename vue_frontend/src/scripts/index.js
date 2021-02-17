import axios from "axios";

// save secret
export const savesecret = async item => {
  let data = {
    secret: item.secret,
    expireAfter: item.expiresAfter, // The secret won't be available after the given number of views
    expireAfterViews: item.expiresAfterViews // The secret won't be available after the given time. The value is provided in minutes. 0 means never expires
  };
  let request = {
    url: "http://localhost:3000",
    method: "post",
    headers: {
      "Content-type": "application/json"
    },
    data: JSON.stringify(data)
  };
  const response = await axios(request);
  return response.data;
};

// retrive secret
export const retrivesecret = async item => {
  /**
     * {
         "hash": "[The hash of the string]",
         "secretText": "[The original text]",
         "createdAt": "[The Timestamp the secret was created]",
         "expiresAt": "[The Timestamp the secret if TTL is given]",
         "remainingViews": 0
        }
    */
  let request = {
    url: "http://localhost:3000" + item,
    method: "get",
    headers: {
      "Content-type": "application/json"
    }
  };
  const response = await axios(request);
  return response.data;
};
