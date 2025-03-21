// context/store/index.js
const { homepage } = require("./homepage");
const contentManagement = require("./contentManagement");
const recentActivity = require("./recentActivity");
const projectsManagement = require("./projectsManagement");
const propertiesManagement = require("./propertiesManagement");
const blogManagement = require("./blogManagement");

const createStore = (set, get) => ({
  loading: false,
  ...homepage(set),
  ...contentManagement(set),
  ...recentActivity(set),
  ...projectsManagement(set),
  ...propertiesManagement(set),
  ...blogManagement(set, get), 
});

module.exports = createStore;