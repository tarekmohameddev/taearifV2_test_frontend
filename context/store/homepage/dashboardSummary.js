import axiosInstance from "@/lib/axiosInstance";

module.exports = (set) => ({
  dashboardSummary: null,
  isDashboardSummaryUpdated: false,
  setDashboardSummary: (data) =>
    set((state) => ({
      homepage: {
        ...state.homepage,
        dashboardSummary: data,
        isDashboardSummaryUpdated: true,
      },
    })),

  fetchDashboardSummary: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(
        "https://taearif.com/api/dashboard/summary",
      );
      set((state) => ({
        homepage: {
          ...state.homepage,
          dashboardSummary: response.data,
          isDashboardSummaryUpdated: true,
        },
      }));
    } catch (error) {
      console.error("Error fetching dashboard summary:", error);
    } finally {
      set({ loading: false });
    }
  },
}); 

