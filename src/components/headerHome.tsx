import * as React from "react";
import Cta from "./cta";
import { IoIosSearch } from "react-icons/io";
import { SearchBar, onSearchFunc } from "@yext/search-ui-react";
import { SearchActions, useSearchActions } from "@yext/search-headless-react";
import { IoClose, IoCloseCircle } from "react-icons/io5";
import { useState } from "react";

type Link = {
  label: string;
  url: string;
};

const links: Link[] = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "Mobile",
    url: "#",
  },
  {
    label: "Internet",
    url: "#",
  },
  {
    label: "Solutions",
    url: "#",
  },
  {
    label: "Insights",
    url: "#",
  },
];

const HeaderHome = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const handleSearch: onSearchFunc = (searchEventData) => {
    const { query } = searchEventData;
    if (query) window.open("/search.html?query=" + query, "_self");
  };

  return (
    <div className="relative">
      <div className=" mb-8">
        <header className=" py-5 px-0 bg-black">
          <div className="font-bold  items-center text-white centered-container w-full flex justify-between">
            <div>
              <a href="https://www.verizon.com" className="mr-4 mx-auto">
                <img
                  className="w-8"
                  src="data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iNDI4IiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDQyOCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDI1MEg3Ny43MkwxNTUuNDMgNDE2LjY3TDM0OS43MyAwSDQyNy40NUwxOTQuMjkgNTAwSDExNi41OEwwIDI1MFoiIGZpbGw9IiNFRTAwMDAiLz4KPC9zdmc+Cg=="
                  alt="Link to verizon website"
                />
              </a>
            </div>
            <div className="flex gap-4">
              {links.map((item, index) => (
                <a key={index} href={item.url} className=" hover:underline">
                  {item.label}
                </a>
              ))}
            </div>
            <div className="flex gap-4 items-center">
              <div>LogIn</div>
              <div
                className="font-light flex  gap-1 items-center rounded-full px-4 py-2 bg-[#1b1d1f] hover:cursor-pointer"
                onClick={() => setShowSearch(true)}
              >
                <div>Search</div>
                <IoIosSearch className="h-6 w-6" />
              </div>
            </div>
          </div>
        </header>
      </div>
      {showSearch && (
        <div className="h-screen bg-black w-full z-10 absolute flex justify-end px-36 -mt-8 ">
          <div className="w-1/3  ">
            <SearchBar
              onSearch={handleSearch}
              hideRecentSearches={true}
              customCssClasses={{
                searchBarContainer: `homeSearch`,
                inputElement: `!p-0 !bg-transparent text-3xl caret-white !text-white`,
                option: `opts`,
                icon: `hover:!none`,
                inputDivider: `!border-none`,
              }}
              placeholder="What are you looking for?"
            ></SearchBar>
          </div>
          <IoClose
            className="h-8 w-8 text-white "
            onClick={() => setShowSearch(false)}
          />
        </div>
      )}
    </div>
  );
};

export default HeaderHome;
