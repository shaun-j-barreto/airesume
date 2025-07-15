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
  fileContent: string;
};

type ResumeContextType = {
  data: ResumeData | undefined;
  setData: (data: ResumeData) => void;
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [data, setDataState] = useState<ResumeData | undefined>();

  useEffect(() => {
    const stored = localStorage.getItem("resume-data");
    if (stored) {
      setDataState(JSON.parse(stored));
    }
  }, []);

  const setData = (data: ResumeData) => {
    localStorage.setItem("resume-data", JSON.stringify(data));
    setDataState(data);
  };

  return (
    <ResumeContext.Provider value={{ data, setData }}>
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
