import { connectDB } from "./db/dbConnection.js";
import dotenv from "dotenv";
import {app} from "./app.js";

dotenv.config({
    path: "./.env",
});    


const PORT = process.env.PORT;

await connectDB()
  .then(() => {
    app.on('error', err => {
      console.error('Server error:', err);
    });
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('Failed to connect to the database:', error);
    process.exit(1); // Exit the process with failure
  });