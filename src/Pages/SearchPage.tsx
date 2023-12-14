import {
  provideHeadless,
  useSearchActions,
  useSearchState,
  VerticalResults as VerticalResultsData,
} from "@yext/search-headless-react";
import {
  DropdownItem,
  FocusedItemData,
  onSearchFunc,
  RenderEntityPreviews,
  SearchBar,
} from "@yext/search-ui-react";
import { useState } from "react";
import ProductsGrid from "./ProductsGrid";
import FAQsPage from "./FAQsPage";
import LinksPage from "./LinksPage";
import ContactInfoPage from "./ContactInfoPage";
import HomePage from "./HomePage";
import Locator from "../templates/locator";
import StoreLocator from "../components/StoreLocator";
import searchConfig from "../components/searchConfig";
import Ce_device from "../types/devices";
import { Image } from "@yext/sites-components";
import React from "react";
import { useEffect } from "react";
const SearchPage = () => {
  const searchActions = useSearchActions();
  const [currentPath, setCurrentPath] = useState({
    label: "All Results",
    id: "all",
  });

  const navbarItem = [
    {
      label: "All Results",
      id: "all",
    },

    {
      label: "Devices",
      id: "devices",
    },
    {
      label: "FAQs",
      id: "faqs",
    },
    {
      label: "Contact Information",
      id: "contactInfo",
    },
    {
      label: "Links",
      id: "links",
    },
    {
      label: "Locations",
      id: "locator",
    },
    {
      label: "Videos",
      id: "videos",
    },
  ];
  const entityPreviewSearcher = provideHeadless({
    ...searchConfig,
    headlessId: "entity-preview-searcher",
  });
  const query = new URLSearchParams(window.location.search).get("query");
  const vert = useSearchState((state) => state.vertical.verticalKey);
  const handleSearch: onSearchFunc = (searchEventData) => {
    const { query } = searchEventData;
    const queryParams = new URLSearchParams(window.location.search);

    if (query) {
      queryParams.set("query", query);
    } else {
      queryParams.delete("query");
    }
    history.pushState(null, "", "?" + queryParams.toString());
    query && searchActions.setQuery(query);
    vert
      ? (searchActions.setVertical(vert), searchActions.executeVerticalQuery())
      : (searchActions.setUniversal(), searchActions.executeUniversalQuery());
  };
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    currentPath.id !== "all"
      ? queryParams.set("vertical", currentPath.id)
      : queryParams.delete("vertical");
    history.pushState(null, "", "?" + queryParams.toString());
  }, [currentPath]);
  const renderEntityPreviews: RenderEntityPreviews = (
    autocompleteLoading: boolean,
    verticalKeyToResults: Record<string, VerticalResultsData>,
    dropdownItemProps: {
      onClick: (
        value: string,
        _index: number,
        itemData?: FocusedItemData
      ) => void;
      ariaLabel: (value: string) => string;
    }
  ): JSX.Element | null => {
    const productResults = verticalKeyToResults["devices"]?.results.map(
      (result) => result.rawData
    ) as unknown as Ce_device[];

    return productResults ? (
      <div className="grid grid-cols-4 px-2 gap-2 text-black">
        {productResults.map((result) => (
          <DropdownItem
            className="border gap-2"
            key={result.id}
            value={result.name}
            onClick={() => history.pushState(null, "", `/product/${result.id}`)}
            ariaLabel={dropdownItemProps.ariaLabel}
          >
            <DropdownItem
              key={result.id}
              value={result.name}
              ariaLabel={dropdownItemProps.ariaLabel}
            >
              <a
                href={"https://verizon.com"}
                className="flex flex-col gap-2 w-full"
              >
                {result.c_answersPhoto ? (
                  <Image
                    image={result.c_answersPhoto}
                    className="h-full !w-full p-6 mx-auto"
                  />
                ) : (
                  <img
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Femfprotectionaustralia.com.au%2Fwp-content%2Fuploads%2F2015%2F07%2Fplaceholder-product.jpg&f=1&nofb=1&ipt=a9e4d6696ca75f1a86e4956ffe79955d42cd8e7777f0d0d7953c31031fc266b2&ipo=images"
                    className="h-full !w-full p-6 mx-auto"
                    alt=""
                  />
                )}
                <div className="flex flex-col gap-2 px-1">
                  <div className="text-xs">{result.name}</div>
                  <div className="text-sm">£{result.c_price?.value}</div>
                </div>
              </a>
            </DropdownItem>
          </DropdownItem>
        ))}
      </div>
    ) : null;
  };
  return (
    <div className=" w-full px-10 ">
      {!currentPath.id ||
      currentPath.id === "devices" ||
      currentPath.id === "all" ? (
        <SearchBar
          hideRecentSearches={true}
          customCssClasses={{
            searchBarContainer: "!mb-0 flex-1 searchBar",
            searchButton: "text-black",
          }}
          visualAutocompleteConfig={{
            entityPreviewSearcher: entityPreviewSearcher,
            includedVerticals: ["devices"],
            renderEntityPreviews: renderEntityPreviews,
            universalLimit: { devices: 4 },
            entityPreviewsDebouncingTime: 300,
          }}
        />
      ) : (
        <SearchBar
          customCssClasses={{
            searchBarContainer: "!mb-0 flex-1 searchBar",
            searchButton: "text-black searchBar",
          }}
          hideRecentSearches={true}
        />
      )}
      <div className=" bg-white">
        <div className="mx-auto ">
          <div className="h-16 justify-between border-b hidden sm:flex ">
            <div className="ml-6 flex justify-between flex-1">
              {navbarItem.map((item) => (
                <button
                  key={item.id}
                  className={`${
                    currentPath.id === item.id && "border-primary-green"
                  }inline-flex items-center px-1 pt-1 border-transparent hover:border-primary-green border-b-2 text-sm font-medium`}
                  onClick={() => setCurrentPath(item)}
                >
                  <div className="font-bold">{item.label ?? item.id}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {currentPath && currentPath.id === "devices" ? (
        <ProductsGrid />
      ) : currentPath.id === "faqs" ? (
        <FAQsPage />
      ) : currentPath.id === "links" ? (
        <LinksPage />
      ) : currentPath.id === "contactInfo" ? (
        <ContactInfoPage />
      ) : currentPath.id === "links" ? (
        <LinksPage />
      ) : currentPath.id === "locator" ? (
        <StoreLocator />
      ) : (
        <HomePage />
      )}
    </div>
  );
};

export default SearchPage;
