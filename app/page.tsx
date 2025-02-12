"use client"; // Needed for handling form submission in React

import { useState } from "react";

export default function HomePage() {
  const [longUrl, setLongUrl] = useState(""); // Store user input
  const [shortUrl, setShortUrl] = useState(""); // Store shortened URL

  // Function to handle form submission
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault(); // Prevent page reload

    const response = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: longUrl }),
    });

    const data = await response.json();
    if (data.shortUrl) {
      setShortUrl(data.shortUrl); // Update state with the shortened URL
    } else {
      alert("Failed to shorten URL. Please try again.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">🔗 URL Shortener</h1>
      
      {/* URL Input Form */}
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
        <input
          type="url"
          required
          placeholder="Enter a long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="p-2 border border-gray-300 rounded w-80"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Shorten URL
        </button>
      </form>

      {/* Display Shortened URL */}
      {shortUrl && (
        <p className="mt-4">
          ✅ Shortened URL: <a href={shortUrl} target="_blank" className="text-blue-600">{shortUrl}</a>
        </p>
      )}
    </div>
  );
}
