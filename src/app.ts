import express from "express";

const app = express();
const port = 3000;

app.get("/", (_, res) => {
  res.send("Hello world");
});
app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});

export {
  app,
};
