module.exports = (sequelize, Sequelize) => {
  const Permission = sequelize.define("permission", {
    create: {
      type: Sequelize.BOOLEAN
    },
    read: {
      type: Sequelize.BOOLEAN
    },
    update: {
      type: Sequelize.BOOLEAN
    },
    delete: {
      type: Sequelize.BOOLEAN
    }
  });

  return Permission;
};
