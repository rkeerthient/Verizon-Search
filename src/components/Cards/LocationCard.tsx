import { useRef, useEffect } from "react";
import { CardComponent, CardProps } from "@yext/search-ui-react";
import { RiShoppingCart2Line } from "react-icons/ri";
import Location, { Coordinate } from "../../types/locations";
import { BiEnvelopeOpen } from "react-icons/bi";
import { useLocator } from "../../context/useLocator";
import { PhoneIcon } from "@heroicons/react/20/solid";
import { IoLocationOutline, IoTimeOutline } from "react-icons/io5";

const LocationCard: CardComponent<Location> = ({
  result,
}: CardProps<Location>): JSX.Element => {
  const { distance, name, id, index } = result;
  const {
    address,
    geocodedCoordinate,
    websiteUrl,
    mainPhone,
    hours,
    pickupAndDeliveryServices,
  } = result.rawData;
  const { selectedId, setSelectedId } = useLocator();

  const getGoogleMapsLink = (coordinate: Coordinate): string => {
    return `https://www.google.com/maps/dir/?api=1&destination=${coordinate.latitude},${coordinate.longitude}`;
  };

  const dayName: string = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  return (
    <div
      id={id}
      onClick={() => setSelectedId(id!)}
      className={`flex flex-col justify-between border p-4 gap-4 bg-white mx-4 ${
        selectedId === id ? `border-t-2 border-red-700` : `border-b-2 border`
      }`}
    >
      <div className="md:flex md:justify-between ">
        <a href={websiteUrl?.displayUrl} className=" font-bold underline">
          {index}. {name}
        </a>
        <a
          href={websiteUrl?.displayUrl}
          className="hidden md:block px-2 py-1 font-bold border-2 text-sm border-black text-black hover:shadow-md hover:cursor-pointer rounded-full"
        >
          View store details
        </a>
      </div>
      {address && (
        <div className="flex justify-between">
          <div className="flex gap-2">
            <IoLocationOutline className="h-4 w-4 mt-2" />
            <div>
              <p className="text-base md:text-sm">{address.line1}</p>
              <p className="text-base md:text-sm">{`${address.city}, ${address.region} ${address.postalCode}`}</p>
            </div>
          </div>

          <div className="text-sm md:text-base">{distance}mi</div>
        </div>
      )}
      <div className="flex flex-col md:flex-row justify-between">
        <div>
          <p className="text-base md:text-sm">
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
          <div className="flex gap-2 items-center mt-4 md:mt-0">
            <IoTimeOutline className="w-4 h-4" />
            <div>
              {hours[dayName.toLowerCase()].openIntervals[0].start} -{" "}
              {hours[dayName.toLowerCase()].openIntervals[0].end}
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-2 items-start">
        <RiShoppingCart2Line className="mt-1" />
        <div className="flex flex-col">
          <div>
            <a className="underline" href={websiteUrl?.displayUrl}>
              Shop this store
            </a>
          </div>
          <div>
            <div className="text-sm md:flex md:flex-row">
              {pickupAndDeliveryServices?.map((item, index) => (
                <>
                  <span key={index}>{item}</span>
                  {pickupAndDeliveryServices.length >= 1 &&
                    index + 1 !== pickupAndDeliveryServices.length && (
                      <span>,&nbsp;</span>
                    )}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-start">
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
      <a
        href={websiteUrl?.displayUrl}
        className="text-center px-2 py-1 w-full md:w-fit ml-auto font-bold border-2 text-sm border-black text-black hover:shadow-md hover:cursor-pointer rounded-full"
      >
        View store details
      </a>
    </div>
  );
};

export default LocationCard;
