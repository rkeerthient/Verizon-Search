import "@yext/chat-ui-react/bundle.css";

import { IoChatbubblesSharp } from "react-icons/io5";
import { useState } from "react";
import {
  ChatHeadlessProvider,
  HeadlessConfig,
} from "@yext/chat-headless-react";
import { ChatPanel, ChatHeader } from "@yext/chat-ui-react";
const config: HeadlessConfig = {
  botId: import.meta.env.YEXT_PUBLIC_BOTID,
  apiKey: import.meta.env.YEXT_PUBLIC_BOT_API_KEY,
};
const Footer = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      <footer className="">
        <img src="https://i.imgur.com/TJLHGD0.png" alt="" />
      </footer>
      {showChat && (
        <div className="w-full md:w-[400px] top-24 md:top-20 h-sceen mb-8 fixed md:mb-0 md:right-5">
          <ChatHeadlessProvider config={config}>
            <ChatPanel
              showTimestamp={true}
              showFeedbackButtons={true}
              customCssClasses={{
                container: " md:!h-[600px] !h-[70vh] overflow-scroll",
                messageBubbleCssClasses: {
                  bubble__user: `!bg-none !bg-black text-white`,
                },
                inputCssClasses: {
                  sendButton: `!bg-black hover:opacity-80`,
                  container: ` focus:!border-black`,
                },
              }}
              header={
                <ChatHeader
                  showCloseButton={true}
                  onClose={() => setShowChat(false)}
                  title={"Verizon Assistant"}
                  showRestartButton={true}
                  customCssClasses={{
                    container: "!bg-none !bg-black text-white",
                  }}
                ></ChatHeader>
              }
            />
          </ChatHeadlessProvider>
        </div>
      )}
      <div className="fixed bottom-44 md:bottom-10  right-16">
        {!showChat && (
          <IoChatbubblesSharp
            className="text-[#ed0000] hover:cursor-pointer"
            onClick={() => setShowChat(!showChat)}
            style={{
              fontSize: "1.875rem",
              lineHeight: "2.25rem",
            }}
          />
        )}
      </div>
    </>
  );
};

export default Footer;
