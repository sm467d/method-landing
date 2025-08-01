"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [formOpen, setFormOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-screen text-white flex flex-col justify-center px-6" style={{backgroundColor: '#121212'}}>
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Headline */}
        <h1 className="text-6xl md:text-8xl mb-8 tracking-tight leading-none">
          <span className="bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
            Method
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl text-gray-300 leading-relaxed mb-12 max-w-2xl mx-auto">
          Master the message. Join the waitlist.
        </p>

        {/* CTA Button */}
        <div className="flex justify-center items-center">
          <div className="relative">
            {!formOpen ? (
              <button 
                onClick={() => {
                  setFormOpen(true);
                  setError("");
                }}
                className="relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border bg-white hover:bg-gray-100 text-black border-gray-300 hover:border-gray-400 focus-visible:outline-gray-600 text-lg px-8 py-3 h-[48px]"
              >
                <span>Join the Waitlist</span>
              </button>
            ) : (
              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (email && !loading) {
                    setLoading(true);
                    setError("");
                    try {
                      const response = await fetch('/api/waitlist', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: email })
                      });

                      const data = await response.json();
                      
                      if (!response.ok) {
                        setError(data.error || 'Something went wrong');
                        setLoading(false);
                        return;
                      }

                      setError("");
                      setLoading(false);
                      setSubmitted(true);
                      setTimeout(() => {
                        setFormOpen(false);
                        setSubmitted(false);
                        setEmail("");
                      }, 2000);
                    } catch (error) {
                      setLoading(false);
                      setSubmitted(true);
                      setTimeout(() => {
                        setFormOpen(false);
                        setSubmitted(false);
                        setEmail("");
                      }, 2000);
                    }
                  }
                }}
                className="flex items-center"
              >
                <div className={`flex items-center border border-gray-300 rounded-md bg-white overflow-hidden transition-all duration-500 ease-out ${submitted ? 'w-[250px]' : 'w-[350px]'} h-[48px]`}>
                  {!submitted ? (
                    <>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError("");
                        }}
                        placeholder="Enter your email"
                        className="flex-1 px-6 py-3 text-lg text-black outline-none bg-transparent"
                        autoFocus
                        required
                      />
                      <button
                        type="submit"
                        className="px-4 py-3 hover:bg-gray-100 transition-colors h-full rounded-md"
                        disabled={loading}
                      >
                        {loading ? (
                          <Loader2 className="w-5 h-5 text-black animate-spin" />
                        ) : (
                          <ArrowRight className="w-5 h-5 text-black" />
                        )}
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center justify-center w-full px-6 py-3 text-lg text-black">
                      <span className="text-green-600">✓</span>
                      <span className="ml-2">You're on the list!</span>
                    </div>
                  )}
                </div>
              </form>
            )}
            {error && formOpen && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-md whitespace-nowrap">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
