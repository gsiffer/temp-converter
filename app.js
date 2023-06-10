const http = require("http");
const process = require("process");
const { createReadStream } = require("fs");
const { logic } = require("./utils/logic");
const querystring = require("querystring");
const path = require("path");

const port = process.env.PORT || 5000;

const imagePaths = {
  "/images/No-Entry-Symbol.png": "No-Entry-Symbol.png",
  "/images/temp.png": "temp.png",
};

const listener = (req, res) => {
  const url = req.url;
  const method = req.method;
  let body = "";

  res.writeHead(200, {
    "Content-Type": "text/html",
  });

  if (url === "/" && method === "GET") {
    createReadStream(path.join(__dirname, "pages", "index.html")).pipe(res);
  } else if (url === "/temp" && method === "POST") {
    try {
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        const data = querystring.parse(body);
        let content = "";
        logic(data, (err, result) => {
          if (err) {
            console.log(err.message);
            content = `<h3 style="color: red">${err.message}</h3>`;
          } else {
            content = `<h3 style="color: green;">Temperature ${data.temp}${
              data.convertType === "CtoF"
                ? "<sup>&deg;</sup>C"
                : "<sup>&deg;</sup>F"
            } = ${result}${
              data.convertType === "CtoF"
                ? "<sup>&deg;</sup>F"
                : "<sup>&deg;</sup>C"
            }</h3>`;
          }
        });
        res.end(content);
      });
    } catch (error) {
      res.end(`<h3 style="color: red">${error.message}</h3>`);
    }
  } else if (url in imagePaths && method === "GET") {
    const imagePath = path.join(__dirname, "images", imagePaths[url]);
    res.writeHead(200, {
      "Content-Type": "image/png",
    });
    createReadStream(imagePath).pipe(res);
  } else if (url === "/scripts/script.js" && method === "GET") {
    createReadStream(path.join(__dirname, "scripts", "script.js")).pipe(res);
  } else if (url === "/icons/favicon.ico" && method === "GET") {
    createReadStream(path.join(__dirname, "icons", "favicon.ico")).pipe(res);
  } else {
    createReadStream(path.join(__dirname, "pages", "bad_request.html")).pipe(
      res
    );
  }
};

const server = http.createServer(listener);

const start = () => {
  try {
    server.listen(port, () => {
      console.log(`sever is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
