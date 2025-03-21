// Importa todos los módulos de la carpeta homepage
const visitorData = require("./visitorData");
const setupProgress = require("./setupProgress");
const trafficSources = require("./trafficSources");
const dashboardSummary = require("./dashboardSummary");
const dashboardDevice = require("./dashboardDevice");

module.exports.homepage = (set) => ({
  homepage: {
    // Incluye todos los módulos relacionados con homepage
    ...visitorData(set),
    ...setupProgress(set),
    ...trafficSources(set),
    ...dashboardSummary(set),
    ...dashboardDevice(set),

    // Funciones compartidas
    setSelectedTimeRange: (range) =>
      set((state) => ({
        homepage: { ...state.homepage, selectedTimeRange: range },
      })),
  },
});
