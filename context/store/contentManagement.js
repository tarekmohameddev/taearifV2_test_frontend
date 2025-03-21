import axiosInstance from "@/lib/axiosInstance";

module.exports = (set) => ({
  contentManagement: {
    newSectionDialogOpen: false,
    statusFilter: "all",
    searchQuery: "",
    sections: [],
    apiAvailableIcons: [],
    error: null,
    loading: true,
    newSectionName: "",
    newSectionDescription: "",
    newSectionStatus: true,
    newSectionIcon: "FileText",
  },

  fetchContentSections: async () => {
    set((state) => ({
      contentManagement: {
        ...state.contentManagement,
        loading: true,
        error: null,
      },
    }));

    try {
      const response = await axiosInstance.get(
        "https://taearif.com/api/content/sections",
      );
      set((state) => ({
        contentManagement: {
          ...state.contentManagement,
          sections: response.data.data.sections,
          apiAvailableIcons: response.data.data.availableIcons,
          loading: false,
        },
      }));
    } catch (error) {
      set((state) => ({
        contentManagement: {
          ...state.contentManagement,
          error: error.message || "حدث خطأ أثناء جلب البيانات",
          loading: false,
        },
      }));
    }
  },

  setContentManagement: (updates) =>
    set((state) => ({
      contentManagement: {
        ...state.contentManagement,
        ...updates,
      },
    })),
});
