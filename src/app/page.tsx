"use client";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="max-w-3xl w-full">
        {/* Keep the title and pronunciation centered */}
        <div className="text-center mb-8">
          <h1 className="text-8xl md:text-9xl font-normal text-gray-800 mb-4">
            HOCA
          </h1>
          <div className="text-3xl md:text-4xl text-gray-600">/hoʊkə/</div>
        </div>

        {/* Left-aligned content */}
        <div className="text-2xl md:text-3xl text-gray-700 text-left">
          <p className="mb-4">
            <span className="italic">noun</span>
          </p>
          <p className="mb-8">A term representing [insert definition here].</p>
          <p className="text-2xl text-gray-500 italic">
            "Example usage of HOCA in a sentence."
          </p>
        </div>
      </div>
    </div>
  );
}
