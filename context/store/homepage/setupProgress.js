import axiosInstance from "@/lib/axiosInstance";

module.exports = (set) => ({
  setupProgressData: null,
  isSetupProgressDataUpdated: false,
  
  setSetupProgressData: (data) => set((state) => ({
    homepage: {
      ...state.homepage,
      setupProgressData: data,
      isSetupProgressDataUpdated: true,
    },
  })),

  fetchSetupProgressData: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(
        "https://taearif.com/api/dashboard/setup-progress",
      );
      set((state) => ({
        homepage: {
          ...state.homepage,
          setupProgressData: response.data,
          isSetupProgressDataUpdated: true,
        },
      }));
    } catch (error) {
      console.error("Error fetching setup progress data:", error);
    } finally {
      set({ loading: false });
    }
  },
});