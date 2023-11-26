module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("role", {
      roleName: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    });
  
    return Role;
  };
  