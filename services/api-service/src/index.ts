import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import supplierRoutes from "./routes/supplierRoutes";
const app = express();
app.use(bodyParser.json());
console.log("cors");
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.use("/suppliers", supplierRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT as number, () => {
  console.log(`API Service running on port ${PORT}`);
});
