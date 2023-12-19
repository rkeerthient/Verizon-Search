import "@yext/chat-ui-react/bundle.css";
import {
  ChatHeadlessProvider,
  HeadlessConfig,
} from "@yext/chat-headless-react";
import { ChatHeader, ChatPanel } from "@yext/chat-ui-react";
import { IoChatbubblesSharp, IoCaretDownOutline } from "react-icons/io5";
import { useState } from "react";
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
        <div
          className="w-[400px]  mb-8"
          style={{ bottom: "20px", right: "20px", position: "fixed" }}
        >
          <ChatHeadlessProvider config={config}>
            <ChatPanel
              showTimestamp={true}
              showFeedbackButtons={true}
              customCssClasses={{
                container: "md:!h-[600px] !h-full overflow-scroll",
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
      <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
        {!showChat ? (
          <IoChatbubblesSharp
            className="text-brand-cta opac"
            onClick={() => setShowChat(!showChat)}
            style={{
              fontSize: "1.875rem",
              lineHeight: "2.25rem",
            }}
          />
        ) : (
          <IoCaretDownOutline
            onClick={() => setShowChat(!showChat)}
            className="text-brand-cta"
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
