"use client";
import React, {useState} from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import {NextUIProvider} from "@nextui-org/react";
import {UserJwt} from "@/types/UserJwt";
import Chatbot from "react-chatbot-kit";
import config from "@/components/Chatbot/config";
import MessageParser from "@/components/Chatbot/MessageParser";
import ActionProvider from "@/components/Chatbot/ActionProvider";
import 'react-chatbot-kit/build/main.css';
import "@/components/Chatbot/FaqOptions.css";

export default function DefaultLayout({
  children,
    user,
}: {
  children: React.ReactNode;
  user: UserJwt;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <NextUIProvider>

      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} user={user}/>
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} user={user}/>
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
              {/* <ChatBot flow={flow} options={chatBotOptions}/> */}
              <Chatbot
                config={config}
                messageParser={MessageParser}
                actionProvider={ActionProvider}
              />
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
      </NextUIProvider>
    </>
  );
}
