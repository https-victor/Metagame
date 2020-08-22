// This is just an example of how your keys.js should be:

module.exports = {
  URI:
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV != "production"
      ? "../app/build"
      : "../public_html",
  HOST:
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV != "production"
      ? "107.180.2.86"
      : "localhost",
  DB: "databaseName",
  USER: "userName",
  PWD: "password123",
};
