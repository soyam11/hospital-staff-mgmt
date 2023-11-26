module.exports = (sequelize, Sequelize) => {
  const Staff = sequelize.define("Staff", {
    name: {
      type: Sequelize.STRING
    },
    department: {
      type: Sequelize.STRING
    },
    jobTitle: {
      type: Sequelize.STRING
    },
    contactInfo: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING,
      unique: true
    },
    password: {
      type: Sequelize.STRING
    },
  });

  return Staff;
};
