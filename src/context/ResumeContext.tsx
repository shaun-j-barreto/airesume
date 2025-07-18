"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type ResumeData = {
  role: string;
  strenghts: string[];
  missing: string[];
  improvement: string[];
  ats: string[];
  score: number;
  scoreJustification: string;
};

type ResumeContextType = {
  data: ResumeData | undefined;
  setData: (data: ResumeData) => void;
  clearData: () => void;
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [data, setDataState] = useState<ResumeData | undefined>();

  useEffect(() => {
    const stored = sessionStorage.getItem("resume-data");
    if (stored) {
      setDataState(JSON.parse(stored));
    }
  }, []);

  const setData = (data: ResumeData) => {
    sessionStorage.setItem("resume-data", JSON.stringify(data));
    setDataState(data);
  };

  const clearData = () => {
    sessionStorage.removeItem("resume-data");
    setDataState(undefined);
  };

  return (
    <ResumeContext.Provider value={{ data, setData, clearData }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResumeContext must be used within a ResumeProvider");
  }
  return context;
};
