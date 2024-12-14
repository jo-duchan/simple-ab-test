import { create } from "zustand";
import {
  UserActionData,
  TimeSpentData,
} from "@/shared/types/prototype-analytics";

export type AnalyticsState = {
  data: {
    userActions: UserActionData;
    timeSpent: TimeSpentData;
  };
};

export type AnalyticsActions = {
  setAnalytics: (data: AnalyticsState["data"]) => void;
  resetAnalytics: () => void;
};

export type AnalyticsStore = AnalyticsState & AnalyticsActions;

const initState: AnalyticsState = {
  data: {
    userActions: {},
    timeSpent: {},
  },
};

const useAnalyticsStore = create<AnalyticsStore>()((set) => ({
  ...initState,
  setAnalytics: (data) => set(() => ({ data })),
  resetAnalytics: () => set(initState),
}));

export default useAnalyticsStore;
