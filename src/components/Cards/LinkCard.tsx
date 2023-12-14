import { CardProps } from "@yext/search-ui-react";
import Ce_link from "../../types/link";
import { LexicalRichText } from "@yext/react-components";
import RTF from "../RTF";
const LinkCard = (props: CardProps<Ce_link>): JSX.Element => {
  const { result } = props;
  const { name } = result;
  const { landingPageUrl, bodyV2 } = result.rawData;
  console.log(bodyV2);

  return (
    <div className="w-full my-4 border p-4 bg-white">
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-2  w-3/5">
          <div className="text-xl text-[#014c6b] font-medium">{name}</div>
        </div>
        <div>
          <RTF>{bodyV2.markdown.slice(0, 200)}</RTF>
        </div>
        <div className=" ml-0   gap-4">
          <a href={landingPageUrl}>Learn more {`>`}</a>
        </div>
      </div>
    </div>
  );
};

export default LinkCard;
