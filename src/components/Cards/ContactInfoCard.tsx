import { CardProps } from "@yext/search-ui-react";
import { LexicalRichText } from "@yext/react-components";
import Ce_contactInformation from "../../types/contact_information";
const LinkCard = (props: CardProps<Ce_contactInformation>): JSX.Element => {
  const { result } = props;
  const { name } = result;
  const { landingPageUrl, richTextDescriptionV2, c_lineOfBusiness1} = result.rawData;
 
  return (
    <div className="w-full my-4 border p-4 bg-white flex justify-between">
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-2  w-3/5">
          <div className="text-xl text-[#014c6b] font-medium">{name}</div>
          <div className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
        {c_lineOfBusiness1}
      </div>
        </div>
        <div>
          <LexicalRichText serializedAST={JSON.stringify(richTextDescriptionV2.json)}></LexicalRichText>
        </div>
      </div>
      <div className=" ml-0   gap-4">
          <a href={landingPageUrl}>Learn more {`>`}</a>
        </div>
    </div>
  );
};

export default LinkCard;
