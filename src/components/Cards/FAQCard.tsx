import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import { useState } from "react";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import Faq from "../../types/faqs";
import { LexicalRichText } from "@yext/pages-components";

const FAQCard = (props: CardProps<Faq>): JSX.Element => {
  const { result } = props;
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="w-full border-b p-4 my-4 ">
      <div className=" ">
        <div onClick={() => setIsActive(!isActive)}>
          <div className="text-sm md:text-xl font-bold  hover:cursor-pointer  ">
            <span>{result.name}</span>
            <div style={{ float: "right" }}>
              {isActive ? (
                <ChevronUpIcon className="w-7 text-[#083b3a]" />
              ) : (
                <ChevronDownIcon className="w-7 text-[#083b3a]" />
              )}
            </div>
          </div>
        </div>
        {isActive && (
          <div className="flex flex-col gap-4">
            <div className="  mt-3 flex flex-col gap-2 ">
              <LexicalRichText
                serializedAST={JSON.stringify(result.rawData.answerV2.json)}
              />
            </div>
            <div>
              <a
                className="capitalize px-4 py-2 border-black border-2  font-bold hover:shadow-xl text-black rounded-full"
                href={result.rawData.c_primaryCTA?.link}
              >
                {result.rawData.c_primaryCTA?.label}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQCard;
