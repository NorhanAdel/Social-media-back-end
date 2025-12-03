const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db/config");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const adminRoutes = require("./routes/adminRoutes");
const postRoutes = require("./routes/postRoutes");
const conversationRoutes = require("./routes/conversationRout"); // Corrected route
const messageRoutes = require("./routes/message")
dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/rating", bookRoutes);
app.use("/conversation", conversationRoutes);
app.use("/admin", adminRoutes);
app.use("/message", messageRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
