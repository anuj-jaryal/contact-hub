"use client";

import { useEffect } from "react";

export default function Home() {
  const newUrl = "https://digitaltoolcrate.com";

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = newUrl;
    }, 4500); // 4.5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-xl w-full text-center bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Website Moved 🚀
        </h1>

        <p className="text-gray-600 mb-6">
          This website has been moved to a new domain.
        </p>

        <a
          href={newUrl}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition"
        >
          Go to digitaltoolcrate.com
        </a>

        <p className="text-sm text-gray-500 mt-4">
          You will be automatically redirected in a few seconds...
        </p>
      </div>
    </main>
  );
}