const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(express.json());
const dbPath = path.join(__dirname, "h2.db");
let db = null;
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("server running");
    });
  } catch (e) {
    console.log("DB Error: ${e.message}");
    process.exit(1);
  }
};
initializeDBAndServer();

//GET API
app.get("wishliste", async (request, response) => {
  const getWishlistsQuery = `SELECT * FROM h2.db`;
  const wishlistsArray = await db.all(getWishlistsQuery);
  response.send(wishlistsArray);
});

//POST API
app.post("wishlists", async (request, response) => {
  const wishlistsDetails = request.body;
  const addWishlistQuery = `INSERT INTO h2.db(wishlistsName, number, role) VALUES ('${wishlistsName}','${number}','${role}')`;
  const dbResponse = await db.run(addWishlistQuery);
  response.send(dbResponse);
});

//DELETE API
app.delete("/wishlists/:wishlistId", async (request, response) => {
  const { wishlistId } = request.params;
  const deleteQuery = `DELETE FROM h2.db WHERE wishlist_id=${wishlistId}`;
  await db.run(deleteQuery);
  response.send("Wishlist Removed");
});

module.exports = app;
