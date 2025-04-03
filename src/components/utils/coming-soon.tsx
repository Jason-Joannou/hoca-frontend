import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface ComingSoonProps {
  message?: string;
}

export default function ComingSoon({
  message = "Coming Soon!",
}: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <DotLottieReact
        src="https://lottie.host/9bd4bc09-b90c-4f4a-93ac-910cb4bded06/yhlBCztST9.lottie"
        loop
        autoplay
        style={{ width: 300, height: 300 }}
      />
      <h2 className="text-2xl font-bold mt-4">{message}</h2>
      <p className="text-gray-500">
        We're working on this feature. Stay tuned!
      </p>
    </div>
  );
}
