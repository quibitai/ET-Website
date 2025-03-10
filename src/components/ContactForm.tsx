import React, { useState, useRef, useCallback, memo, useEffect } from "react";
import { Send, Check, AlertTriangle, Maximize2, Minimize2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { useTheme } from "../theme";
import emailjs from '@emailjs/browser';
import ReactDOM from 'react-dom';

// EmailJS service constants
const SERVICE_ID = "service_uc0z9ka"; // Echo Tango EmailJS service ID
const TEMPLATE_ID = "template_ws944mf"; // Echo Tango EmailJS template ID
const PUBLIC_KEY = "CJJzucdsOMBOAuSul"; // Echo Tango EmailJS public key

// Fullscreen textarea modal component
const FullscreenTextarea = ({ 
  value, 
  onChange, 
  onClose,
  placeholder,
  isSubmitting,
  visualMode,
  isRetro
}: { 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; 
  onClose: () => void;
  placeholder: string;
  isSubmitting: boolean;
  visualMode: string;
  isRetro: boolean;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Focus the textarea when the modal opens
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-[#F5F5F5] dark:bg-[#16192E] rounded-xl overflow-hidden shadow-xl flex flex-col h-[80vh]">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className={visualMode === 'grayscale'
            ? "text-[#333333] dark:text-[#DDDDDD] font-medium"
            : isRetro
              ? "text-white font-medium" 
              : "text-[#FF3B31] dark:text-[#FF7A6E] font-medium"
          }>
            Your Message
          </h3>
          <button 
            onClick={onClose}
            className={visualMode === 'grayscale'
              ? "text-[#333333] dark:text-[#DDDDDD] hover:text-gray-600 dark:hover:text-gray-300"
              : isRetro
                ? "text-white hover:text-gray-300"
                : "text-[#FF3B31] dark:text-[#FF7A6E] hover:text-[#FF3B31]/70 dark:hover:text-[#FF7A6E]/70"
            }
            aria-label="Close fullscreen editor"
          >
            <Minimize2 size={20} />
          </button>
        </div>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full p-4 flex-grow ${
            visualMode === 'grayscale'
              ? "bg-[#F5F5F5] dark:bg-[#222222] text-[#333333] dark:text-[#DDDDDD] placeholder-[#333333] dark:placeholder-[#DDDDDD]/60"
              : isRetro
                ? "bg-[#000088] text-white placeholder-white placeholder-opacity-90"
                : "bg-[#F5F5F5] dark:bg-[#16192E] text-[#FF3B31] dark:text-[#FF7A6E] placeholder-[#FF3B31] dark:placeholder-[#FF7A6E]/60"
          } placeholder-opacity-50 placeholder:font-bold focus:outline-none border-none`}
          disabled={isSubmitting}
          style={isRetro ? { 
            textShadow: 'none',
            fontFamily: 'VT323, monospace',
            fontSize: '1.25rem',
            letterSpacing: '0.5px'
          } : {}}
        />
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg ${
              visualMode === 'grayscale'
                ? "bg-[#333333] dark:bg-[#DDDDDD] text-[#F5F5F5] dark:text-[#222222] hover:bg-[#333333]/90 dark:hover:bg-[#DDDDDD]/90"
                : isRetro 
                  ? "bg-[#00AA00] text-white hover:bg-[#00CC00]"
                  : "bg-[#FF3B31] dark:bg-[#FF7A6E] text-[#F5F5F5] dark:text-[#16192E] hover:bg-[#FF3B31]/90 dark:hover:bg-[#FF7A6E]/90"
            }`}
            style={isRetro ? { textShadow: 'none' } : {}}
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

const ContactForm: React.FC = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { visualMode, isRetro } = useTheme();

  // Reset status after a delay
  useEffect(() => {
    if (submitStatus !== "idle") {
      const timer = setTimeout(() => {
        setSubmitStatus("idle");
        setErrorMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const handleTextareaChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  }, []);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const openFullscreen = useCallback(() => {
    setIsFullscreen(true);
  }, []);

  const closeFullscreen = useCallback(() => {
    setIsFullscreen(false);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || !email.trim()) {
      setSubmitStatus("error");
      setErrorMessage("Please fill in both email and message fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitStatus("idle");
      setErrorMessage("");

      // Initialize EmailJS
      emailjs.init(PUBLIC_KEY);
      
      // Prepare template parameters
      const templateParams = {
        from_name: "Website Contact Form",
        from_email: email,
        message: `Email: ${email}\n\nMessage:\n${message}`,
        reply_to: email,
        email: email, // Adding explicit email parameter for the template
      };
      
      // Send email
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
      
      // Handle success
      setSubmitStatus("success");
      setMessage("");
      setEmail("");
    } catch (error) {
      // Handle error
      console.error("Email send failed:", error);
      setSubmitStatus("error");
      setErrorMessage("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }, [message, email]);
  
  // Get appropriate button styles based on submission state
  const getButtonStyles = () => {
    const baseClasses = visualMode === 'grayscale'
      ? "rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#333333] dark:focus:ring-[#DDDDDD] flex items-center justify-center h-[44px] w-[44px] min-w-[44px]"
      : isRetro
        ? "rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white flex items-center justify-center h-[44px] w-[44px] min-w-[44px]"
        : "rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF3B31] dark:focus:ring-[#FF7A6E] flex items-center justify-center h-[44px] w-[44px] min-w-[44px]";
    
    if (isSubmitting) {
      return `${baseClasses} ${
        visualMode === 'grayscale'
          ? "bg-gray-400 dark:bg-gray-500 text-[#F5F5F5] dark:text-[#222222] cursor-wait"
          : isRetro
            ? "bg-[#00AA00] text-white cursor-wait"
            : "bg-[#FF3B31]/60 dark:bg-[#FF7A6E]/60 text-[#F5F5F5] dark:text-[#16192E] cursor-wait"
      }`;
    }
    
    if (submitStatus === "success") {
      return `${baseClasses} ${
        visualMode === 'grayscale'
          ? "bg-green-600 dark:bg-green-500 text-[#F5F5F5] dark:text-[#222222]"
          : isRetro
            ? "bg-[#00AA00] text-white"
            : "bg-green-600 dark:bg-green-500 text-[#F5F5F5] dark:text-[#16192E]"
      }`;
    }
    
    if (submitStatus === "error") {
      return `${baseClasses} ${
        visualMode === 'grayscale'
          ? "bg-red-600 dark:bg-red-500 text-[#F5F5F5] dark:text-[#222222]"
          : isRetro
            ? "bg-[#AA0000] text-white"
            : "bg-red-600 dark:bg-red-500 text-[#F5F5F5] dark:text-[#16192E]"
      }`;
    }
    
    return `${baseClasses} ${
      visualMode === 'grayscale'
        ? "bg-[#333333] dark:bg-[#DDDDDD] text-[#F5F5F5] dark:text-[#222222] hover:bg-[#333333]/90 dark:hover:bg-[#DDDDDD]/90"
        : isRetro
          ? "bg-[#00AA00] text-white hover:bg-[#00CC00]"
          : "bg-[#FF3B31] dark:bg-[#FF7A6E] text-[#F5F5F5] dark:text-[#16192E] hover:bg-[#FF3B31]/90 dark:hover:bg-[#FF7A6E]/90"
    }`;
  };

  // Button icon based on status
  const getButtonIcon = () => {
    if (isSubmitting) {
      return (
        <div className="h-5 w-5 border-2 border-t-transparent rounded-full animate-spin" />
      );
    }
    
    if (submitStatus === "success") {
      return <Check size={20} />;
    }
    
    if (submitStatus === "error") {
      return <AlertTriangle size={20} />;
    }
    
    return <Send size={20} />;
  };

  // Retro mode specific inline styles
  const retroStyles = isRetro ? {
    textShadow: 'none',
    fontFamily: 'VT323, monospace',
    fontSize: '1.25rem',
    letterSpacing: '0.5px'
  } : {};

  return (
    <div className={visualMode === 'grayscale' 
      ? "bg-[#E0E0E0]/70 dark:bg-[#333333] p-8 h-full" 
      : isRetro
        ? "bg-[#0000AA] p-8 h-full"
        : "bg-[#FFEB94]/70 dark:bg-[#3A3D45] p-8 h-full"
    }>
      <h3 className={visualMode === 'grayscale'
        ? "text-[#333333] dark:text-[#DDDDDD] font-medium text-lg mb-5"
        : isRetro
          ? "text-white font-medium text-lg mb-5"
          : "text-[#FF3B31] dark:text-[#FF7A6E] font-medium text-lg mb-5"
      } id="contact-form-heading">
        Drop us a line...
      </h3>
      <form ref={formRef} onSubmit={handleSubmit} aria-labelledby="contact-form-heading">
        <div className="mb-4 relative">
          <label htmlFor="message" className="sr-only">Your message</label>
          <textarea
            id="message"
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            placeholder="YOU KNOW THE DRILL."
            className={`w-full p-4 ${visualMode === 'grayscale'
              ? "bg-[#F5F5F5] dark:bg-[#222222] text-[#333333] dark:text-[#DDDDDD] placeholder-[#333333] dark:placeholder-[#DDDDDD]/60"
              : isRetro
                ? "bg-[#000088] text-white placeholder-white placeholder-opacity-90"
                : "bg-[#F5F5F5] dark:bg-[#16192E] text-[#FF3B31] dark:text-[#FF7A6E] placeholder-[#FF3B31] dark:placeholder-[#FF7A6E]/60"
            } placeholder-opacity-50 placeholder:font-bold focus:outline-none focus:ring-2 ${
              visualMode === 'grayscale'
                ? "focus:ring-[#333333] dark:focus:ring-[#DDDDDD]"
                : isRetro
                  ? "focus:ring-white"
                  : "focus:ring-[#FF3B31] dark:focus:ring-[#FF7A6E]"
            } border-none min-h-[100px] rounded-xl resize-none pr-10`}
            aria-required="true"
            required
            disabled={isSubmitting}
            style={retroStyles}
          />
          <button 
            type="button"
            onClick={openFullscreen}
            className={`absolute top-2 right-2 p-1.5 rounded-md ${
              visualMode === 'grayscale'
                ? "text-[#333333] dark:text-[#DDDDDD] hover:bg-[#333333]/10 dark:hover:bg-[#DDDDDD]/10"
                : isRetro
                  ? "text-white hover:bg-[#00AA00]/30"
                  : "text-[#FF3B31] dark:text-[#FF7A6E] hover:bg-[#FF3B31]/10 dark:hover:bg-[#FF7A6E]/10"
            }`}
            aria-label="Open fullscreen editor"
          >
            <Maximize2 size={16} />
          </button>
        </div>
        
        {errorMessage && (
          <div className={`mb-2 text-sm ${
            visualMode === 'grayscale'
              ? "text-red-600 dark:text-red-400"
              : isRetro
                ? "text-white font-bold"
                : "text-red-600 dark:text-red-400"
          }`}>
            {errorMessage}
          </div>
        )}
        
        <div className="flex items-stretch space-x-3">
          <div className="w-full flex-grow">
            <label htmlFor="email" className="sr-only">Your email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="email"
              className={visualMode === 'grayscale'
                ? "w-full py-2.5 px-4 bg-[#F5F5F5] dark:bg-[#222222] text-[#333333] dark:text-[#DDDDDD] placeholder-[#333333] dark:placeholder-[#DDDDDD]/60 placeholder-opacity-50 placeholder:font-bold focus:outline-none focus:ring-2 focus:ring-[#333333] dark:focus:ring-[#DDDDDD] border-none rounded-full h-[44px]"
                : isRetro
                  ? "w-full py-2.5 px-4 bg-[#000088] text-white placeholder-white placeholder-opacity-90 placeholder-opacity-50 placeholder:font-bold focus:outline-none focus:ring-2 focus:ring-white border-none rounded-full h-[44px]"
                  : "w-full py-2.5 px-4 bg-[#F5F5F5] dark:bg-[#16192E] text-[#FF3B31] dark:text-[#FF7A6E] placeholder-[#FF3B31] dark:placeholder-[#FF7A6E]/60 placeholder-opacity-50 placeholder:font-bold focus:outline-none focus:ring-2 focus:ring-[#FF3B31] dark:focus:ring-[#FF7A6E] border-none rounded-full h-[44px]"
              }
              aria-required="true"
              required
              disabled={isSubmitting}
              style={retroStyles}
            />
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  type="submit"
                  className={getButtonStyles()}
                  aria-label={
                    isSubmitting ? "Sending message..." : 
                    submitStatus === "success" ? "Message sent successfully" : 
                    submitStatus === "error" ? "Error sending message" : 
                    "Send message"
                  }
                  disabled={isSubmitting}
                  style={isRetro ? { textShadow: 'none' } : {}}
                >
                  {getButtonIcon()}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {isSubmitting ? "Sending..." : 
                   submitStatus === "success" ? "Message sent!" : 
                   submitStatus === "error" ? "Failed to send" : 
                   "Send Message"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </form>
      
      {/* Fullscreen textarea modal */}
      {isFullscreen && (
        <FullscreenTextarea
          value={message}
          onChange={handleTextareaChange}
          onClose={closeFullscreen}
          placeholder="YOU KNOW THE DRILL."
          isSubmitting={isSubmitting}
          visualMode={visualMode}
          isRetro={isRetro}
        />
      )}
    </div>
  );
};

export default memo(ContactForm);
