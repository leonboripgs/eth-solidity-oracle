require("dotenv").config();

import request from "request-promise-native";

import {
  updateRequest,
  newRequest
} from "./ethereum";

const start = () => {

  newRequest((error, result) => {
    let options = {
      uri: result.args.urlToQuery,
      json: true
    };

    for (let i = 0; i < 3; i++ ) {
      request(options)
        .then(parseData(result))
        .then(updateRequest(i))
        .catch(error);
    }
    
  });
};

const parseData = result => (body) => {
  return new Promise((resolve, reject) => {
    let id, valueRetrieved;
    try {
      id = result.args.id;
      valueRetrieved = (body[result.args.attributeToFetch] || 0).toString();
    } catch (error) {
      reject(error);
      return;
    }
    resolve({
      id,
      valueRetrieved
    });
  });
};

export default start;