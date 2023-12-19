import * as React from "react";
import {
  ChatHeadlessProvider,
  HeadlessConfig,
} from "@yext/chat-headless-react";
import { ChatHeader, ChatPanel } from "@yext/chat-ui-react";
import { IoChatbubblesSharp, IoCaretDownOutline } from "react-icons/io5";
import { useState } from "react";
const config: HeadlessConfig = {
  botId: "verizon-assistant",
  apiKey: "6d47649d2d769e29375b33ae0898c9dd",
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
              showFeedbackButtons={false}
              stream={true}
              customCssClasses={{
                inputContainer: "fixed w-[400px] m-auto  bottom-0",
                container: "h-[400px] overflow-scroll bg-black text-white",
              }}
              header={
                <ChatHeader
                  showCloseButton={true}
                  title={"NWC Assistant"}
                  showRestartButton={true}
                ></ChatHeader>
              }
            />
          </ChatHeadlessProvider>
        </div>
      )}
      <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
        {!showChat ? (
          <IoChatbubblesSharp
            className="text-brand-cta"
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
