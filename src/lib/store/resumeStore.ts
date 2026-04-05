import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Resume } from "@/types/resume";

interface ResumeState {
  resume: Resume | null;

  setResume: (resume: Resume) => void;

  updateField: (field: keyof Resume, value: any) => void;

  clearResume: () => void;
}

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      resume: null,

      setResume: (resume) => set({ resume }),

      updateField: (field, value) =>
        set((state) => ({
          resume: state.resume
            ? { ...state.resume, [field]: value }
            : state.resume,
        })),

      clearResume: () => set({ resume: null }),
    }),
    {
      name: "pulse-resume-storage", // 🔥 localStorage key
    }
  )
);