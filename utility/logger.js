const db = require('../models');
const Log = db.Log;

const logActivity = async (action, status, userId, requestBody = null) => {
  try {
    await Log.create({ action, status, userId, requestBody: JSON.stringify(requestBody) });
  } catch (error) {
    console.error('Error logging activity:', error);
  }
};

module.exports = logActivity;
