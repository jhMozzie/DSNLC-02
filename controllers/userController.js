const User = require("../models/user");

exports.createUser = async (req, res) => {
  const { username, password, fullname, isadmin } = req.body;

  try {
    const user = await User.create({
      username,
      password,
      fullname,
      isadmin: isadmin || false,
    });
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};

exports.editUser = async (req, res) => {
  const { id } = req.params;
  const { username, password, fullname, isadmin } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    user.username = username || user.username;
    user.password = password || user.password;
    user.fullname = fullname || user.fullname;
    user.isadmin = isadmin !== undefined ? isadmin : user.isadmin;

    await user.save();
    res.status(200).json({ message: "Usuario actualizado", user });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscar el usuario por el username
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Comparar la contraseña ingresada con la almacenada
    if (user.password !== password) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    if (!user.isadmin) {
      return res
        .status(403)
        .json({
          error: "Acceso denegado: No tienes permisos de administrador.",
        });
    }

    res.status(200).json({ message: "Inicio de sesión exitoso", user });
  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await user.destroy();
    res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};
