"use client";
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { NextUIProvider } from "@nextui-org/react";
import { UserJwt } from "@/types/UserJwt";
import Chatbot from "react-chatbot-kit";
import config from "@/components/Chatbot/config";
import MessageParser from "@/components/Chatbot/MessageParser";
import ActionProvider from "@/components/Chatbot/ActionProvider";
import "react-chatbot-kit/build/main.css";
import "@/components/Chatbot/FaqOptions.css";
import { FaComment, FaTimes } from "react-icons/fa";
import IConfig from "react-chatbot-kit/build/src/interfaces/IConfig";

export default function DefaultLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserJwt;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatbotVisible, setChatbotVisible] = useState(false);

  const toggleChatbotVisibility = () => {
    setChatbotVisible((prevVisible) => !prevVisible);
  };

  return (
    <>
      <NextUIProvider>
        {/* <!-- ===== Page Wrapper Start ===== --> */}
        <div className="flex h-screen overflow-hidden">
          {/* <!-- ===== Sidebar Start ===== --> */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} user={user} />
          {/* <!-- ===== Sidebar End ===== --> */}

          {/* <!-- ===== Content Area Start ===== --> */}
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {/* <!-- ===== Header Start ===== --> */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} user={user} />
            {/* <!-- ===== Header End ===== --> */}

            {/* <!-- ===== Main Content Start ===== --> */}
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                {children}
              </div>
            </main>
            {/* <!-- ===== Main Content End ===== --> */}
          </div>
          {/* <!-- ===== Content Area End ===== --> */}
        </div>
        {/* <!-- ===== Page Wrapper End ===== --> */}
        {chatbotVisible && (
          <div className="fixed bottom-16 right-4 bg-white shadow-lg rounded-lg overflow-hidden">
            <Chatbot
              config={config as IConfig}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
            />
          </div>
        )}
        <button
          onClick={toggleChatbotVisibility}
          className="fixed bottom-4 right-4 z-50 rounded-full p-3 bg-primary text-white shadow-lg"
        >
          {chatbotVisible ? <FaTimes /> : <FaComment />}
        </button>
      </NextUIProvider>
    </>
  );
}
