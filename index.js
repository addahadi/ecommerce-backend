
const express = require("express");
require("dotenv").config();

const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/user.route");
const productRoutes = require("./routes/product.route");
const wishRoutes = require("./routes/wishlist.route");
const notiRoutes = require("./routes/notification.route")
const sellerRoutes = require("./routes/seller.route")
const session = require("express-session")
const MySQLStore = require("express-mysql-session")(session);
const app = express();


app.use(express.json()); 
app.use(express.static(path.join(__dirname, "../frontEnd")));
app.use(
  "/server/uploads",
  express.static(path.join(__dirname, "../server/uploads"))
);
app.use("/uploads", express.static("uploads"));




let sessionStore;
try {
  sessionStore = new MySQLStore({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  sessionStore.on("error", (err) => {
    console.error("❌ Session Store Error:", err.message);
  });
} catch (err) {
  console.error("🔥 Failed to set up session store:", err.message);
}


if(sessionStore){
  app.use(
    session({
      key: "session_cookie_name",
      secret: "your_super_secret_key",
      store: sessionStore,
      resave: true,
      saveUninitialized: true,
    })
  );
}


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ecommerce-front-end-5yjz.vercel.app/",
    ],
    credentials: true,
  })
);


const x = 0;



app.get("/", (req, res) => {
  res.status(200).send("Hello from the server!");
});




app.use("/auth", authRoutes);

app.use("/products" , productRoutes);

app.use("/wishlists" , wishRoutes);

app.use("/seller", sellerRoutes);

app.use("/notification", notiRoutes);


const PORT = process.env.PORT || 8033;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
