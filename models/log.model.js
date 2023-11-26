

module.exports = (sequelize, Sequelize) => {
    const Log = sequelize.define("log", {
      action: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.STRING
      },
      requestBody: {
        type: Sequelize.TEXT 
      }
    });
  
    return Log;
  };
  