"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageIcon, Mic, Send } from "lucide-react";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { d1, d2, d3 } from "@/assets/imageExports";

const TalkDataToMe = () => {
  const [messages, setMessages] = useState<
    Array<{ text: string; isUser: boolean; imageUrl: string }>
  >([]);
  const [inputText, setInputText] = useState("");
  const [isChatStarted, setIsChatStarted] = useState(false);

  const handleSend = async () => {
    try {
      if (inputText.trim()) {
        setMessages([
          ...messages,
          { text: inputText, isUser: true, imageUrl: "" },
        ]);
        setIsChatStarted(true);
        setInputText("");

        const response = await axios.post(`/api/generate`, {
          prompt: inputText,
        });

        const { imageUrl } = response.data;

        // Add the AI response with the image
        setMessages((prev) => [
          ...prev,
          {
            text: "Here's the generated image based on your prompt:",
            isUser: false,
            imageUrl: imageUrl,
          },
        ]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, you have reached your limit. Try again in one hour!",
          isUser: false,
          imageUrl: "",
        },
      ]);
    }
  };

  const imageMap = {
    d1: d1,
    d2: d2,
    d3: d3,
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {!isChatStarted && (
        <main className="max-w-2xl mx-auto p-8">
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-gray-100 rounded-2xl mb-4">
              {/* <BoltIcon className="w-6 h-6 text-gray-600" /> */}
            </div>
            <h2 className="text-2xl font-bold mb-2">
              Tell Me What You Want to See
            </h2>
            <p className="text-gray-600">
            Choose a prompt below or write your own to generate an image with <span className="text-gray-800 font-semibold">Imagine</span>
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <h3 className="text-sm font-medium text-gray-500">
              Try prompts like:
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Futuristic cityscape",
                "Cyberpunk character",
                "Alien landscape",
                "Space exploration",
                "Virtual reality world",
              ].map((item) => (
                <button
                  key={item}
                  className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm"
                  onClick={() => setInputText(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </main>
      )}

      {isChatStarted && (
        <div className="flex-1 overflow-auto p-4 px-10  space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.isUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={` font-semibold  flex flex-col  justify-end p-3 rounded-lg ${
                  message.isUser
                    ? "bg-gray-100 text-gray-800 items-end"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {message.text}
                {message.imageUrl && (
                  <div className="max-w-lg">
                  <Image
                    src={imageMap[message.imageUrl as keyof typeof imageMap]}
                    alt="Generated image"
                    className="mt-2 rounded-lg h-auto"
                  />
                  </div>
                )}
               
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200">
      <div className="relative z-10 max-w-2xl mx-auto flex items-center  overflow-hidden rounded-lg shadow-sm  p-1">
        <div className="animate-rotate absolute inset-0 h-full w-full rounded-full bg-[conic-gradient(#C0C0C0_20deg,transparent_120deg)]"></div>
        <div className="relative z-20 flex w-full rounded-lg bg-gray-100 p-1">
          <Input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            className="flex-grow ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0 bg-gray-100 font-semibold"
          />
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSend}
              className="h-9 w-9"
            >
              <Send className="h-5 w-5 text-gray-500" />
            </Button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default TalkDataToMe;
