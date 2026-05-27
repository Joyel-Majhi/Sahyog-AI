import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, MessageCircle, X } from "lucide-react";

// Simple knowledge base
const knowledgeBase: { question: string; answer: string }[] = [
  { question: "pan card", answer: "You can apply for a PAN card under Online Services → PAN Card. Fee is ₹200 for Learner's and ₹500 for Permanent." },
  { question: "aadhar", answer: "You can update Aadhaar details by visiting Online Services → Aadhaar Update. It is usually free or costs ₹50 for biometric updates." },
  { question: "complaint", answer: "You can register a complaint by going to the Complaint Box section. We track and resolve most complaints within 7 days." },
  { question: "tracking", answer: "To track your application, click on 'Track Application' from the homepage and enter your Application ID." },
  { question: "fees", answer: "Different services have different fees. Go to Online Services and choose the one you want to see the exact cost." },
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([
    { sender: "bot", text: "👋 Hi! I’m your assistant. Ask me about services, fees, or complaints!" },
  ]);
  const [input, setInput] = useState("");

  const findAnswer = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();

    const matched = knowledgeBase.find((kb) =>
      lowerMessage.includes(kb.question)
    );

    return matched
      ? matched.answer
      : "Sorry, I don't have an answer for that yet. Please check our Services section.";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");

    const answer = findAnswer(userMessage);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: answer },
      ]);
    }, 500);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            className="rounded-full w-14 h-14 shadow-lg"
            onClick={() => setIsOpen(true)}
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        )}
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 w-80 bg-white rounded-2xl shadow-xl border border-border z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
              <span className="font-semibold">AI Assistant</span>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 max-h-80">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg text-sm max-w-[80%] ${
                    msg.sender === "user"
                      ? "bg-blue-100 ml-auto text-right"
                      : "bg-gray-100 mr-auto"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex items-center p-3 border-t">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about services..."
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <Button variant="ghost" size="icon" onClick={handleSend}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
