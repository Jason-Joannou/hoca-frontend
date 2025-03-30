import React from "react";
import { LoginForm } from "@/components/login-form";
import Link from "next/link";

const page = () => {
  return (
    <div className="min-h-screen w-full bg-white p-6 md:p-10 relative">
      {/* Back to home link */}
      <div className="absolute top-6 left-6">
        <Link
          href="/"
          className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
        >
          <span>←</span> Back to Home
        </Link>
      </div>

      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-normal text-gray-800 mb-2">
            HOCA
          </h1>
          <p className="text-xl text-gray-600">
            /hoʊkə/ - A belonging to a greater collective
          </p>
        </header>

        {/* Main content - split into two columns on larger screens */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
          {/* About section - left side */}
          <div className="md:w-1/2 space-y-6 bg-[url('/subtle-pattern.png')] bg-opacity-5 p-6 rounded-lg">
            <h2 className="text-3xl font-normal text-gray-800 mb-4">
              About HOCA
            </h2>

            <p className="text-lg text-gray-700">
              HOCA represents what we do together, again and again. It's a
              concept that embodies collective action, shared purpose, and
              community building.
            </p>

            {/* Quote callout */}
            <div className="my-8 border-l-4 border-gray-300 pl-6 italic text-gray-600">
              "HOCA is what we do together, again and again."
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-medium text-gray-800">
                Our Philosophy
              </h3>
              <p className="text-lg text-gray-700">
                We believe in the power of community and collaboration. When
                individuals come together with shared values and purpose, we can
                achieve remarkable things.
              </p>

              <h3 className="text-xl font-medium text-gray-800">What We Do</h3>
              <p className="text-lg text-gray-700">
                HOCA facilitates connections between like-minded individuals,
                provides resources for collective growth, and creates spaces for
                meaningful interaction.
              </p>

              <h3 className="text-xl font-medium text-gray-800">Join Us</h3>
              <p className="text-lg text-gray-700">
                By registering, you become part of our community. Connect with
                others, participate in events, and contribute to our collective
                journey.
              </p>
            </div>
          </div>

          {/* Registration form - right side */}
          <div className="md:w-1/2 bg-gray-50 p-8 rounded-lg border border-gray-100">
            <h2 className="text-2xl font-normal text-gray-800 mb-6 text-center">
              Register
            </h2>
            <div className="w-full max-w-sm mx-auto">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
