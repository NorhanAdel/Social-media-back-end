const express = require("express");
const app = express();
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth")
const postRouter = require("./routes/post");
// Load environment variables
dotenv.config();


mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


 
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
 app.use("/api/post", postRouter);

 
const PORT = process.env.PORT || 5550;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
