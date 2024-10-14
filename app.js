const express = require("express");
const sequelize = require("./config/config");
const userRoutes = require("./routes/user");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/users", userRoutes);

sequelize
  .sync()
  .then(() => {
    console.log("Conectado a la base de datos");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error al conectar la base de datos:", err);
  });
