const { homepage } = require("./homepage");
const contentManagement = require("./contentManagement");
const recentActivity = require("./recentActivity");
const projectsManagement = require("./projectsManagement");
const propertiesManagement = require("./propertiesManagement");
// Si tienes un archivo blogManagement.js, descomenta la siguiente línea
// const blogManagement = require("./blogManagement");

const createStore = (set) => ({
  loading: false,
  ...homepage(set),
  ...contentManagement(set),
  ...recentActivity(set),
  ...projectsManagement(set),
  ...propertiesManagement(set),
  // Si tienes un archivo blogManagement.js, descomenta la siguiente línea
  // ...blogManagement(set),
});

module.exports = createStore;