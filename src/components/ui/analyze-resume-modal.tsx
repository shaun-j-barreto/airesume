"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  useModal,
} from "../ui/animated-modal";
import Image from "next/image";
import { FileUpload } from "@/components/ui/file-upload";

export function AnalyzeResumeModal() {
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };
  return (
    <div className="py-15 flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-[#7e22ce]/90 hover:bg-black/20 hover:scale-105 transition duration-400  px-6 py-2 text-xl cursor-pointer font-medium rounded-md border border-[#d8b4fe]/50 shadow-md flex justify-center group/modal-btn z-80">
          <span className=" text-(--color-text-primary) group-hover/modal-btn:translate-x-70 text-center transition duration-500">
            📄 Analyze Resume
          </span>
          <div className="-translate-x-70 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 z-60">
            <Image
              src="/assets/images/upload.png"
              alt="upload"
              width={30}
              height={30}
            />
          </div>
        </ModalTrigger>

        <ModalBody>
          <form action="">
            <ModalContent>
              <h4 className="text-lg md:text-2xl text-purple-100  font-bold text-center mb-8">
                🧠 Analyze Your Resume with AI 🤖
              </h4>
              <div className="flex flex-col">
                <label
                  htmlFor="role"
                  className="text-purple-100 text-sm mb-0.5 font-medium"
                >
                  Role
                </label>
                <input
                  name="role"
                  className="bg-neutral-900 rounded-md px-2 py-1 text-white text-sm mb-1.5 border border-dashed border-purple-300"
                  placeholder="e.g. Software Engineer, Data Scientist"
                />
              </div>
              <div className="w-full max-w-4xl mx-auto min-h-80 border border-dashed border-purple-300 bg-neutral-900 rounded-lg">
                <FileUpload onChange={handleFileUpload} />
              </div>
            </ModalContent>
            <ModalFooter className="gap-4">
              <CancelButton />
              <button className="cursor-pointer bg-purple-400 text-black  text-sm px-2 py-1 rounded-md border border-black w-28 hover:scale-105 transition duration-200">
                Start
              </button>
            </ModalFooter>
          </form>
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
