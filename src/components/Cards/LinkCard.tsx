import { CardProps } from "@yext/search-ui-react";
import Ce_link from "../../types/link";
import RTF from "../RTF";
const LinkCard = (props: CardProps<Ce_link>): JSX.Element => {
  const { result } = props;
  const { name } = result;
  const { landingPageUrl, bodyV2 } = result.rawData;

  return (
    <div className="w-full my-4 border p-4 bg-white">
      <div className="flex flex-col gap-4 justify-evenly">
        <div className="text-xl text-black font-bold">{name}</div>
        {bodyV2 && (
          <div>
            <RTF>{bodyV2.markdown.slice(0, 200)}</RTF>
          </div>
        )}
        <div className=" ml-0   gap-4">
          <a className="font-bold hover:underline" href={landingPageUrl}>
            Learn more {`>`}
          </a>
        </div>
      </div>
    </div>
  );
};

export default LinkCard;
