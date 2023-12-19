import { CardComponent, CardProps } from "@yext/search-ui-react";
import { RiShoppingCart2Line } from "react-icons/ri";
import Location, { Coordinate } from "../../types/locations";
import { BiEnvelopeOpen } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { PhoneIcon } from "@heroicons/react/20/solid";

const LocationUniversalCard: CardComponent<Location> = ({
  result,
}: CardProps<Location>): JSX.Element => {
  const { name, id, index } = result;
  const {
    address,
    geocodedCoordinate,
    websiteUrl,
    mainPhone,
    hours,
    pickupAndDeliveryServices,
  } = result.rawData;

  const getGoogleMapsLink = (geoCoordinate: Coordinate): string => {
    return `https://www.google.com/maps/dir/?api=1&destination=${geoCoordinate.latitude},${geoCoordinate.longitude}`;
  };

  const dayName: string = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  return (
    <div
      id={id}
      className={`flex flex-col md:flex-row justify-between border p-4 gap-4 bg-white md:mx-4 items-center`}
    >
      <div className="flex flex-col w-full">
        <div className="flex justify-between ">
          <a href={websiteUrl?.displayUrl} className=" font-bold underline">
            {index}. {name}
          </a>
        </div>
        {address && (
          <div className="flex justify-between mt-4">
            <div className="flex gap-2">
              <IoLocationOutline className="h-4 w-4 mt-2" />
              <div>
                <p className="text-base md:text-sm">{address.line1}</p>
                <p className="text-base md:text-sm">{`${address.city}, ${address.region} ${address.postalCode}`}</p>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-between flex-col mt-4">
          <div>
            <p className="md:text-sm">
              {mainPhone && (
                <div className="flex items-center gap-2">
                  <PhoneIcon className="h-4 w-4" />
                  {mainPhone &&
                    mainPhone
                      .replace("+1", "")
                      .replace(/\D+/g, "")
                      .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}
                </div>
              )}
            </p>
          </div>
          {hours && (
            <div className="flex gap-2 items-center mt-4">
              <BsClock className="h-4 w-4" />
              <div>
                {hours[dayName.toLowerCase()].openIntervals[0].start} -{" "}
                {hours[dayName.toLowerCase()].openIntervals[0].end}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex gap-2 items-start">
          <RiShoppingCart2Line className="mt-1" />
          <div className="flex flex-col">
            <div>
              <a className="underline" href={websiteUrl?.displayUrl}>
                Shop this store
              </a>
            </div>
            <div>
              <div className="text-sm md:flex">
                {pickupAndDeliveryServices?.map((item, index) => (
                  <span key={index}>
                    <span>{item}</span>
                    {pickupAndDeliveryServices.length >= 1 &&
                      index + 1 !== pickupAndDeliveryServices.length && (
                        <span>,&nbsp;</span>
                      )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-start mt-4">
          <BiEnvelopeOpen className="mt-1" />
          <div className="flex flex-col">
            <div>
              <div>5G, LTE & Fios Home Internet sales</div>
            </div>
            <div>
              <div className="text-sm">No equipment return</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <a
          href={websiteUrl?.displayUrl}
          className="px-2 py-1 w-full text-center md:w-fit ml-auto font-bold border-2 text-sm border-black text-black hover:shadow-md hover:cursor-pointer rounded-full"
        >
          View store details
        </a>
      </div>
    </div>
  );
};

export default LocationUniversalCard;
