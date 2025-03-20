import axiosInstance from "@/lib/axiosInstance";

module.exports = (set) => ({
  projectsManagement: {
    viewMode: "grid",
    projects: [],
    pagination: null,
    loading: true,
    error: null,
    isInitialized: false,
  },

  setProjectsManagement: (newState) =>
    set((state) => ({
      projectsManagement: {
        ...state.projectsManagement,
        ...newState,
      },
    })),

  fetchProjects: async () => {
    set((state) => ({
      projectsManagement: {
        ...state.projectsManagement,
        loading: true,
        error: null,
      },
    }));
    
    try {
      const response = await axiosInstance.get(
        "https://taearif.com/api/projects"
      );
      
      set((state) => ({
        projectsManagement: {
          ...state.projectsManagement,
          projects: response.data.data.projects,
          pagination: response.data.data.pagination,
          loading: false,
          isInitialized: true,
        },
      }));
    } catch (error) {
      set((state) => ({
        projectsManagement: {
          ...state.projectsManagement,
          error: error.message || "حدث خطأ أثناء جلب بيانات المشاريع",
          loading: false,
          isInitialized: true,
        },
      }));
    }
  },
}); 