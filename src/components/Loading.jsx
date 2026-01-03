import React from "react";

const Loading = () => {
//   if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* BLUR + DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* SPINNER */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="w-14 h-14 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        <p className="text-sm text-white tracking-wide">Start Gooning for few moment...</p>
      </div>
    </div>
  );
};

export default Loading;
