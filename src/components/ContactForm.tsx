import React, { useState, useRef, useCallback, memo } from "react";
import { Send } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { useTheme } from "../theme";

const ContactForm: React.FC = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { visualMode } = useTheme();

  const handleTextareaChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert(`Message sent: ${message}\nEmail: ${email}`);
    setMessage("");
    setEmail("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [message, email]);

  return (
    <div className={visualMode === 'grayscale' 
      ? "bg-[#E0E0E0]/70 dark:bg-[#333333] p-8 h-full" 
      : "bg-[#FFEB94]/70 dark:bg-[#3A3D45] p-8 h-full"
    }>
      <h3 className={visualMode === 'grayscale'
        ? "text-[#333333] dark:text-[#DDDDDD] font-medium text-lg mb-5"
        : "text-[#FF3B31] dark:text-[#FF7A6E] font-medium text-lg mb-5"
      } id="contact-form-heading">
        Drop us a line...
      </h3>
      <form onSubmit={handleSubmit} aria-labelledby="contact-form-heading">
        <div className="mb-4">
          <label htmlFor="message" className="sr-only">Your message</label>
          <textarea
            id="message"
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            placeholder="YOU KNOW THE DRILL."
            className={visualMode === 'grayscale'
              ? "w-full p-4 bg-[#F5F5F5] dark:bg-[#222222] text-[#333333] dark:text-[#DDDDDD] placeholder-[#333333] dark:placeholder-[#DDDDDD]/60 placeholder-opacity-50 placeholder:font-bold focus:outline-none focus:ring-2 focus:ring-[#333333] dark:focus:ring-[#DDDDDD] border-none min-h-[100px] rounded-xl"
              : "w-full p-4 bg-[#F5F5F5] dark:bg-[#16192E] text-[#FF3B31] dark:text-[#FF7A6E] placeholder-[#FF3B31] dark:placeholder-[#FF7A6E]/60 placeholder-opacity-50 placeholder:font-bold focus:outline-none focus:ring-2 focus:ring-[#FF3B31] dark:focus:ring-[#FF7A6E] border-none min-h-[100px] rounded-xl"
            }
            aria-required="true"
            required
          />
        </div>
        <div className="flex items-center space-x-3">
          <label htmlFor="email" className="sr-only">Your email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="email"
            className={visualMode === 'grayscale'
              ? "flex-1 py-2.5 px-4 bg-[#F5F5F5] dark:bg-[#222222] text-[#333333] dark:text-[#DDDDDD] placeholder-[#333333] dark:placeholder-[#DDDDDD]/60 placeholder-opacity-50 placeholder:font-bold focus:outline-none focus:ring-2 focus:ring-[#333333] dark:focus:ring-[#DDDDDD] border-none rounded-full"
              : "flex-1 py-2.5 px-4 bg-[#F5F5F5] dark:bg-[#16192E] text-[#FF3B31] dark:text-[#FF7A6E] placeholder-[#FF3B31] dark:placeholder-[#FF7A6E]/60 placeholder-opacity-50 placeholder:font-bold focus:outline-none focus:ring-2 focus:ring-[#FF3B31] dark:focus:ring-[#FF7A6E] border-none rounded-full"
            }
            aria-required="true"
            required
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  type="submit"
                  className={visualMode === 'grayscale'
                    ? "p-2.5 bg-[#333333] dark:bg-[#DDDDDD] text-[#F5F5F5] dark:text-[#222222] rounded-full hover:bg-[#333333]/90 dark:hover:bg-[#DDDDDD]/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#333333] dark:focus:ring-[#DDDDDD] flex items-center justify-center w-12 h-12"
                    : "p-2.5 bg-[#FF3B31] dark:bg-[#FF7A6E] text-[#F5F5F5] dark:text-[#16192E] rounded-full hover:bg-[#FF3B31]/90 dark:hover:bg-[#FF7A6E]/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF3B31] dark:focus:ring-[#FF7A6E] flex items-center justify-center w-12 h-12"
                  }
                  aria-label="Send message"
                >
                  <Send size={20} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Send Message</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </form>
    </div>
  );
};

export default memo(ContactForm);
