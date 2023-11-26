const db = require('../models');
const Staff = db.Staff;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



exports.signin = async (req, res) => {
  try {
    const user = await Staff.findOne({ where: { username: req.body.username } });
    if (!user) return res.status(404).send("No user found.");
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: 86400 
    });

    res.status(200).send({ auth: true, token: token });
  } catch (error) {
    res.status(500).send(error.response);
  }
};
