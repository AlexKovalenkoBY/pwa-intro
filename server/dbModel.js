'use strict';

const Sequelize = require('sequelize');
const UserModel = require('./models/user.js');
const PpoModel = require('./models/ppo.js');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    store: '../auto.db'
});
const User = UserModel(sequelize, Sequelize);
const Ppo = PpoModel(sequelize, Sequelize);




let tutorials = {};

tutorials.Sequelize = Sequelize;
tutorials.sequelize = sequelize;


tutorials.tutorialBP = require("../tutorials/models/tutorialBP")(sequelize, Sequelize);
tutorials.tutorialPP = require("../tutorials/models/tutorialPP")(sequelize, Sequelize);
tutorials.tutorialOperations = require("../tutorials/models/tutorialOperations")(sequelize, Sequelize);
tutorials.tutorialDocs = require("../tutorials/models/tutorialDocs")(sequelize, Sequelize);
tutorials.tutorialAttrDocs = require("../tutorials/models/tutorialAttrDocs")(sequelize, Sequelize);
tutorials.tutorialIsp = require("../tutorials/models/tutorialIsp")(sequelize, Sequelize);
tutorials.tutorialConnector = require("../tutorials/models/tutorialConnector")(sequelize, Sequelize);
module.exports = tutorials;