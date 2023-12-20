import { CardProps } from "@yext/search-ui-react";
import { LexicalRichText } from "@yext/pages-components";
import Ce_contactInformation from "../../types/contact_information";
const ContactInfoCard = (
  props: CardProps<Ce_contactInformation>
): JSX.Element => {
  const { result } = props;
  const { name } = result;
  const { landingPageUrl, richTextDescriptionV2, c_lineOfBusiness1 } =
    result.rawData;

  return (
    <div className="w-full my-4 border p-4 bg-white flex justify-between pr-8">
      <div className="flex flex-row justify-between w-3/4">
        <div className="flex flex-col gap-2 ">
          <div className="text-xl text-black font-bold">{name}</div>
          <div className="w-fit inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
            {c_lineOfBusiness1}
          </div>
          {richTextDescriptionV2 && (
            <div className="w-3/4">
              <LexicalRichText
                serializedAST={JSON.stringify(richTextDescriptionV2.json)}
              ></LexicalRichText>
            </div>
          )}
        </div>
      </div>
      <div className=" mr-9 my-auto">
        <a className="font-bold hover:underline" href={landingPageUrl}>
          Learn more {`>`}
        </a>
      </div>
    </div>
  );
};

export default ContactInfoCard;
