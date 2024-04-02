"use client";
import React, { useState } from "react";

import AlertHandler from "@/tools/AlertHandler";

const PocAlert: React.FC = () => {

  const [inputValue, setInputValue] = useState("");

  const showSwalSuccess = () => {
    AlertHandler.showSuccess("Success");
  };

  const showSwalError = () => {
    AlertHandler.showError("Error");
  }

  const showSwalWarning = () => {
    AlertHandler.showWarning("Warning");
  }

  const showSwalInfo = () => {
    AlertHandler.showInfo("Info");
  }

  const showSwalCustomTitle = () => {
    AlertHandler.showSuccess("blablabla", "Custom Title");
  }


  return (
    <div className="h-full w-full flex space-x-4 justify-center items-center mt-20">
      <button
        className="inline-flex items-center justify-center rounded-full bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        onClick={showSwalSuccess}
      >
        Test Success
      </button>
      <button
        className="inline-flex items-center justify-center rounded-full bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        onClick={showSwalError}
      >
        Test Error
      </button>
        <button
            className="inline-flex items-center justify-center rounded-full bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            onClick={showSwalWarning}
        >
            Test Warning
        </button>
        <button
            className="inline-flex items-center justify-center rounded-full bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            onClick={showSwalInfo}
        >
            Test Info
        </button>
        <button
            className="inline-flex items-center justify-center rounded-full bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            onClick={showSwalCustomTitle}
        >
            Test Custom Title
        </button>


    </div>
  );
};

export default PocAlert;
