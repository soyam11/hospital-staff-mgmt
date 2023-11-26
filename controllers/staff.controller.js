const db = require('../models');
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const Staff = db.Staff;
const Role = db.Role;
const Permission = db.Permission;
const Op = Sequelize.Op;

const hashPassword = (password) => bcrypt.hashSync(password, 8);

exports.createStaff = async (req, res) => {
    try {
      const { username, roleName, ...staffData } = req.body;
      const existingUser = await Staff.findOne({ where: { username: username } });
      if (existingUser) {
        return res.status(400).send({ message: "Username already exists." });
      }
  
      const role = await Role.findOne({ where: { roleName: roleName } });
      if (!role) {
        return res.status(400).send({ message: 'Role not found.' });
      }
  
      const staff = await Staff.create({
        ...staffData,
        username: username,
        password: hashPassword(req.body.password),
        roleId: role.id
      });
  
      const response = { ...staff.get({ plain: true }) };
      delete response.password;
      res.status(201).send({ message: "Staff created successfully", staff: response });
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

exports.readStaff = async (req, res) => {
    try {
      const staff = await Staff.findByPk(req.params.id, {
        include: [
            {
              model: Role,
              include: [Permission]
            }
          ],
        attributes: { exclude: ['password'] }
      });
      if (!staff) {
        return res.status(404).send({ message: 'Staff not found' });
      }
      res.send(staff);
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  

exports.updateStaff = async (req, res) => {
  try {
    const { roleName, ...updateData } = req.body;
    const staff = await Staff.findByPk(req.params.id);

    if (!staff) {
      return res.status(404).send({ message: 'Staff not found' });
    }

    if (roleName) {
      const role = await Role.findOne({ where: { roleName: roleName } });
      if (!role) {
        return res.status(400).send({ message: 'Role not found' });
      }
      updateData.roleId = role.id;
    }

    if (updateData.password) {
      updateData.password = hashPassword(updateData.password);
    }

    await staff.update(updateData);
    const response = { ...staff.get({ plain: true }) };
    delete response.password;
    res.send({ message: "Staff updated successfully", staff: response });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deleteStaff = async (req, res) => {
    try {
      const staff = await Staff.findByPk(req.params.id);
      if (!staff) {
        return res.status(404).send({ message: 'Staff not found.' });
      }
      await staff.destroy();
      res.status(200).send({ message: "Staff successfully deleted." });
    } catch (error) {
      res.status(500).send({ message: 'Error deleting staff.', error: error.message });
    }
  };

  exports.searchStaff = async (req, res) => {
    try {
      let query = {};
      const { name, department, ...otherCriteria } = req.query;
  
      if (name) {
        query.name = { [Op.like]: `%${name}%` };
      }
      if (department) {
        query.department = { [Op.like]: `%${department}%` };
      }
  
      for (let key in otherCriteria) {
        if (otherCriteria[key]) {
          query[key] = { [Op.like]: `%${otherCriteria[key]}%` };
        }
      }
      const staffRecords = await Staff.findAll({ where: query,
        attributes: { exclude: ['password'] },
        include: [
          {
            model: Role,
            include: [Permission]
          }
        ]});
      res.status(200).send(staffRecords);
    } catch (error) {
      res.status(500).send({ message: "Error retrieving staff records", error: error.message });
    }
  };
