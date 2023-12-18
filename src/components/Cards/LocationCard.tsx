// src/components/LocationCard.tsx

import { CardComponent, CardProps } from "@yext/search-ui-react";
import { RiShoppingCart2Line } from "react-icons/ri";
import Location, { Coordinate, Interval } from "../../types/locations";
import { BiEnvelopeOpen } from "react-icons/bi";
import { useLocator } from "../../context/useLocator";

const LocationCard: CardComponent<Location> = ({
  result,
}: CardProps<Location>): JSX.Element => {
  const { distance, name, id } = result;

  const { address, geocodedCoordinate, mainPhone, hours } = result.rawData;
  const { selectedId, setSelectedId } = useLocator();

  const getGoogleMapsLink = (coordinate: Coordinate): string => {
    return `https://www.google.com/maps/dir/?api=1&destination=${coordinate.latitude},${coordinate.longitude}`;
  };
  const dayName: string = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  return (
    <div
      onClick={() => setSelectedId(id!)}
      className={`flex flex-col justify-between border p-4 gap-4 bg-white mx-4 ${
        selectedId === id ? `border-red-700` : `border-black`
      }`}
    >
      <div className="flex justify-between ">
        <a
          href={getGoogleMapsLink(geocodedCoordinate!)}
          className=" font-bold underline"
        >
          {name}
        </a>
        <a
          href={getGoogleMapsLink(geocodedCoordinate!)}
          className="px-2 py-1 font-bold border-2 text-sm border-black text-black hover:shadow-md hover:cursor-pointer rounded-full"
        >
          View store details
        </a>
      </div>
      {address && (
        <div className="flex justify-between">
          <div>
            <p className="text-sm">{address.line1}</p>
            <p className="text-sm">{`${address.city}, ${address.region} ${address.postalCode}`}</p>
          </div>
          <div>{distance}mi</div>
        </div>
      )}
      <div className="flex justify-between">
        <div>
          <p className="text-sm">
            {mainPhone && (
              <div className="flex items-center">
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
          <div>
            {hours[dayName.toLowerCase()].openIntervals[0].start} -{" "}
            {hours[dayName.toLowerCase()].openIntervals[0].end}
          </div>
        )}
      </div>
      <div className="flex gap-2 items-start">
        <RiShoppingCart2Line className="mt-1" />
        <div className="flex flex-col">
          <div>
            <a
              className="underline"
              href={getGoogleMapsLink(geocodedCoordinate!)}
            >
              Shop this store
            </a>
          </div>
          <div>
            <div className="text-sm">Express Pickup Curbside & In-store</div>
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
        href={getGoogleMapsLink(geocodedCoordinate!)}
        className="px-2 py-1  w-fit ml-auto font-bold border-2 text-sm border-black text-black hover:shadow-md hover:cursor-pointer rounded-full"
      >
        View store details
      </a>
    </div>
  );
};

export default LocationCard;
