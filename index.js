const fs = require("fs");

const data = fs.readFileSync("./data/db.json");
const db = JSON.parse(data);

const s1 = fs.readFileSync("./data/set_1.json");
const s2 = fs.readFileSync("./data/set_2.json");
const s3 = fs.readFileSync("./data/set_3.json");
const s4 = fs.readFileSync("./data/set_4.json");
const s5 = fs.readFileSync("./data/set_5.json");
const s6 = fs.readFileSync("./data/set_6.json");
const s7 = fs.readFileSync("./data/set_7.json");
const s8 = fs.readFileSync("./data/set_8.json");
const s9 = fs.readFileSync("./data/set_9.json");
const s10 = fs.readFileSync("./data/set_10.json");

function getRandomInt() {
  return Math.floor(Math.random() * 10);
}

function getData(id) {
  switch (id) {
    case 0:
      return s10;
    case 1:
      return s1;
    case 2:
      return s2;
    case 3:
      return s3;
    case 4:
      return s4;
    case 5:
      return s5;
    case 6:
      return s6;
    case 7:
      return s7;
    case 8:
      return s8;
    case 9:
      return s9;
    default:
      return s1;
  }
}

exports.handler = async (event) => {
  if (!event || !event.queryStringParameters) {
    return {
      statusCode: 401,
      error: "You must use a proper API key",
    };
  }

  const { API_KEY, id } = event.queryStringParameters;

  if (API_KEY == null || API_KEY != "api123") {
    return {
      statusCode: 401,
      error: "You must use a proper API key",
    };
  }

  const parsedId = parseInt(id);
  let response;

  if (parsedId && parsedId > 0 && parsedId <= db.length) {
    response = response = {
      statusCode: 200,
      body: JSON.stringify(db[id]),
    };
  } else {
    response = {
      statusCode: 200,
      body: getData(getRandomInt()).toString(),
    };
  }

  return response;
};
