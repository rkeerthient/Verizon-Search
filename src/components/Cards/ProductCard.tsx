import { Image } from "@yext/sites-components";
import { CardProps } from "@yext/search-ui-react";
import Ce_device from "../../types/devices";

const ProductCard = (props: CardProps<Ce_device>) => {
  const { result } = props;
  const { name } = result;
  const {
    c_answersPhoto,
    c_price,
    c_primaryCTA,
    c_secondaryCTA,
    description,
    c_colors,
    c_24MonthlyPrice,
    landingPageUrl,
  } = result.rawData;

  return (
    <div className="bg-gray-50 py-4 shadow-md flex flex-col  h-full gap-y-2 ">
      <div className=" px-4">
        {c_answersPhoto ? (
          <Image
            image={c_answersPhoto}
            className=" !w-3/4 md:!w-full !mx-auto p-4  flex justify-center items-center"
          ></Image>
        ) : (
          <img
            src={
              "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Femfprotectionaustralia.com.au%2Fwp-content%2Fuploads%2F2015%2F07%2Fplaceholder-product.jpg&f=1&nofb=1&ipt=a9e4d6696ca75f1a86e4956ffe79955d42cd8e7777f0d0d7953c31031fc266b2&ipo=images"
            }
            className=" p-4 flex justify-center items-center"
            alt=""
          />
        )}
      </div>
      <div className="flex px-4 w-full flex-col justify-between gap-4">
        <div className="flex flex-col border-black  border-t-2 justify-between gap-2 h-28 md:h-32 font-base text-sm">
          <a
            href={landingPageUrl}
            className="font-bold text-sm md:text-base text-black pt-2 "
          >
            {name}
          </a>
          <div className="font-bold">${c_price?.value}</div>
          <div className="font-base text-sm">
            Starts at ${c_24MonthlyPrice} for 24 months, 0% APR
          </div>
          {c_colors && (
            <div className="flex gap-2">
              {c_colors.map((item, index) => (
                <div
                  key={index}
                  className={`h-4 w-4 rounded-full `}
                  style={{ background: item }}
                ></div>
              ))}
            </div>
          )}
        </div>
        <div className="font-medium h-36 py-4 border-black border-y text-sm my-auto">
          {description}
        </div>
      </div>
      <div className="flex justify-between w-full px-1 py-4 ">
        <a
          href={c_primaryCTA?.link}
          className="w-fit  items-center px-2 py-2 rounded-full text-black border-black bg-white flex justify-center border  text-center mx-auto capitalize font-medium text-sm md:text-xs hover:shadow-lg "
        >
          {c_primaryCTA?.label}
        </a>
        <a
          href={c_secondaryCTA?.link}
          className="w-fit  items-center px-3 py-2 rounded-full text-white border-black bg-black  border flex justify-center text-center mx-auto capitalize font-medium text-sm md:text-xs hover:shadow-lg"
        >
          {c_secondaryCTA?.label}
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
