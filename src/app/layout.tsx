import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Sora, Alumni_Sans } from "next/font/google";
import "./globals.css";
import { ResumeProvider } from "@/context/ResumeContext";
import { ModalProvider } from "@/components/ui/resumeModal/animated-modal";
import { ToastContainer } from "react-toastify";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

const alumni = Alumni_Sans({
  subsets: ["latin"],
  variable: "--font-alumni",
});

export const metadata: Metadata = {
  title: "Shortlist",
  description: "AI-powered resume analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jakarta.variable} ${sora.variable} ${alumni.variable}  antialiased`}
      >
        <ResumeProvider>
          <ModalProvider>
            {children}
            <ToastContainer position="top-center" theme="dark" />
          </ModalProvider>
        </ResumeProvider>
      </body>
    </html>
  );
}
