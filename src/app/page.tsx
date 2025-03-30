"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const thinkingWords = ["noun", "verb", "adjective", "concept", "Abstract"];
  const definition = "A belonging to a greater collective.";
  const example = '"HOCA is what we do together, again and again."';

  const [thinkingText, setThinkingText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [thinkingComplete, setThinkingComplete] = useState(false);
  const [definitionText, setDefinitionText] = useState("");
  const [exampleText, setExampleText] = useState("");
  const [definitionComplete, setDefinitionComplete] = useState(false);
  const [allComplete, setAllComplete] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  // Thinking animation with typing and backspacing
  useEffect(() => {
    if (thinkingComplete) return;

    const currentWord = thinkingWords[currentWordIndex];

    if (isTyping) {
      // Typing forward
      if (thinkingText.length < currentWord.length) {
        const timer = setTimeout(
          () => {
            setThinkingText(currentWord.substring(0, thinkingText.length + 1));
          },
          100 + Math.random() * 100,
        ); // Varied typing speed
        return () => clearTimeout(timer);
      } else {
        // Finished typing current word
        if (currentWordIndex === thinkingWords.length - 1) {
          // If we're on the last word (Abstract), finish thinking phase
          const timer = setTimeout(() => {
            setThinkingComplete(true);
          }, 1000);
          return () => clearTimeout(timer);
        } else {
          // Pause before backspacing
          const timer = setTimeout(() => {
            setIsTyping(false);
          }, 700);
          return () => clearTimeout(timer);
        }
      }
    } else {
      // Backspacing
      if (thinkingText.length > 0) {
        const timer = setTimeout(() => {
          setThinkingText(thinkingText.substring(0, thinkingText.length - 1));
        }, 50); // Faster backspacing
        return () => clearTimeout(timer);
      } else {
        // Move to next word after backspacing
        const timer = setTimeout(() => {
          setCurrentWordIndex(currentWordIndex + 1);
          setIsTyping(true);
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [thinkingText, currentWordIndex, isTyping, thinkingComplete]);

  // Definition typing effect
  useEffect(() => {
    if (thinkingComplete && definitionText.length < definition.length) {
      const timer = setTimeout(() => {
        setDefinitionText(definition.substring(0, definitionText.length + 1));
      }, 70); // Type speed
      return () => clearTimeout(timer);
    } else if (definitionText === definition && !definitionComplete) {
      // Pause before starting example
      const timer = setTimeout(() => {
        setDefinitionComplete(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [thinkingComplete, definitionText, definitionComplete]);

  // Example typing effect
  useEffect(() => {
    if (definitionComplete && exampleText.length < example.length) {
      const timer = setTimeout(() => {
        setExampleText(example.substring(0, exampleText.length + 1));
      }, 70); // Type speed
      return () => clearTimeout(timer);
    } else if (definitionComplete && exampleText === example && !allComplete) {
      // Set all typing complete after a short delay
      const timer = setTimeout(() => {
        setAllComplete(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [definitionComplete, exampleText, allComplete]);

  // Fade in buttons after typing is complete
  useEffect(() => {
    if (allComplete) {
      // Add a small delay before showing buttons for a nicer effect
      const timer = setTimeout(() => {
        setButtonsVisible(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [allComplete]);

  const handleRegistrationClick = () => {
    window.alert("Register");
  };

  const handleLoginClick = () => {
    window.alert("Login");
  };

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

        {/* Left-aligned content with typewriter effect */}
        <div className="text-2xl md:text-3xl text-gray-700 text-left">
          <p className="mb-4 h-10">
            <span className="italic">
              {thinkingComplete ? "Abstract" : thinkingText}
              {thinkingText && !definitionText && !allComplete && (
                <span className="animate-pulse not-italic">|</span>
              )}
            </span>
          </p>
          <p className="mb-4 min-h-[2em]">
            {definitionText}
            {thinkingComplete &&
              definitionText.length < definition.length &&
              !allComplete && <span className="animate-pulse">|</span>}
          </p>
          <p className="text-2xl text-gray-500 italic min-h-[2em]">
            {exampleText}
            {definitionComplete &&
              exampleText.length < example.length &&
              !allComplete && (
                <span className="animate-pulse not-italic">|</span>
              )}
          </p>
        </div>
      </div>

      {/* Buttons with fade-in effect */}
      <div
        className={`flex justify-center gap-6 mt-6 transition-opacity duration-1000 ease-in-out ${
          buttonsVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <Button
          variant="link"
          size="lg"
          className="text-gray-700 hover:text-gray-900 hover:underline transition-colors px-0"
          onClick={handleRegistrationClick}
        >
          Register
        </Button>
        <Button
          variant="link"
          size="lg"
          className="text-gray-700 hover:text-gray-900 hover:underline transition-colors px-0"
          onClick={handleLoginClick}
        >
          Login
        </Button>
      </div>
    </div>
  );
}
