"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  useModal,
} from "./animated-modal";
import { FileUp } from "lucide-react";
import { FileUpload } from "@/components/ui/file-upload";
import { useResumeContext } from "@/context/ResumeContext";
import { useRouter } from "next/navigation";

export function AnalyzeResumeModal() {
  const [files, setFiles] = useState<File[]>([]);
  const [role, setRole] = useState<string>("");
  const router = useRouter();
  const { setData } = useResumeContext();
  const handleData = async () => {
    const formData = new FormData();
    formData.append("role", role);
    if (files.length > 0) {
      formData.append("file", files[0]);
    }
    console.log("Submitting data:", { role, files });
    router.push("/results");
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to submit resume analysis");
      } else {
        const data = await response.json();
        setData({
          role: data.role,
          strenghts: data.strengths,
          missing: data.missing,
          improvement: data.improvement,
          ats: data.ats,
          score: data.score,
          scoreJustification: data.scoreJustification,
          skillsAnalysis: data.skillsAnalysis,
          skillDistribution: data.skillDistribution,
        });
        console.log("Resume analysis submitted successfully:", data);
      }
    } catch (error) {
      console.log("Error submitting resume analysis:", error);
    }
  };

  return (
    <div className="py-15 flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-violet-300 hover:bg-neutral-900/50  transition duration-400  px-6 py-2 text-2xl cursor-pointer font-medium rounded-md border border-purple-500/20 shadow-md flex justify-center group/modal-btn z-80">
          <span className=" text-black font-semibold group-hover/modal-btn:-translate-y-70 text-center transition duration-500">
            Analyze Resume
          </span>
          <div className="translate-y-70 group-hover/modal-btn:translate-y-0 flex items-center justify-center absolute inset-0 transition duration-500 z-60">
            <FileUp />
          </div>
        </ModalTrigger>

        <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-purple-100  font-bold text-center mb-8">
              🧠 Analyze Your Resume with AI
            </h4>
            <div className="flex flex-col">
              <label
                htmlFor="role"
                className="text-purple-100 text-sm mb-0.5 font-medium"
              >
                Role
              </label>
              <input
                id="role"
                className="bg-neutral-900 rounded-md px-2 py-1 text-white text-sm mb-1.5 border border-dashed border-purple-300"
                placeholder="e.g. Software Engineer, Data Scientist"
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
            <div className="w-full max-w-4xl mx-auto min-h-80 border border-dashed border-purple-300 bg-neutral-900 rounded-lg">
              <FileUpload onChange={(files) => setFiles(files)} />
            </div>
          </ModalContent>
          <ModalFooter className="gap-4">
            <CancelButton />
            <StartButton handleData={handleData} />
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}

function CancelButton() {
  const { setOpen } = useModal();

  return (
    <button
      type="button"
      onClick={() => setOpen(false)}
      className="cursor-pointer px-2 py-1 bg-transparent text-(--color-text-primary) transition duration-200 hover:scale-105 border border-purple-300 rounded-md text-sm w-28"
    >
      Cancel
    </button>
  );
}

function StartButton({ handleData }: { handleData: () => void }) {
  const { setOpen } = useModal();
  const { clearData } = useResumeContext();

  return (
    <button
      className="cursor-pointer bg-purple-400 text-black  text-sm px-2 py-1 rounded-md border border-black w-28 hover:scale-105 transition duration-200"
      onClick={() => {
        clearData();
        handleData();
        setOpen(false);
      }}
    >
      Start
    </button>
  );
}
