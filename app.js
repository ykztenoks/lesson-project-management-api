const express = require("express");
const morgan = require("morgan");
const logger = morgan("dev");
const cors = require("cors");
const connectDB = require("./config/mongoose.config.js");
const projectRouter = require("./routes/project.routes.js");
const taskRouter = require("./routes/task.routes.js");
require("dotenv").config();

const app = express();

app.use(logger);
app.use(express.json());

app.use("/projects", projectRouter);
app.use("/tasks", taskRouter);

//CORS CONFIGURATION
//inside origin array you should include app urls that are allowed to make requests to your server
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://www.google.com",
      "https://incredible-mermaid.netlify.app",
    ],
  })
);

connectDB();

app.listen(process.env.PORT, () =>
  console.log("Server up and running on port: " + process.env.PORT)
);
