import { useSearchActions } from "@yext/search-headless-react";
import { SearchBar } from "@yext/search-ui-react";
import { useState } from "react";
import ProductsGrid from "./ProductsGrid";
import FAQsPage from "./FAQsPage";
import LinksPage from "./LinksPage";
import ContactInfoPage from "./ContactInfoPage";
import HomePage from "./HomePage";

 
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
        id: "locations",
      },{
        label: "Videos",
        id: "videos",
      },
  ];
  return (
    <div className=" w-full px-10 ">

    <SearchBar   />
    <div className=" bg-white">
      <div className="mx-auto ">
        <div className="h-16 justify-between border-b hidden sm:flex ">
          <div className="ml-6 flex justify-between flex-1">
            {navbarItem.map((item) => (
              <button
                key={item.id}
                className={ 
                  `${currentPath.id === item.id && "border-primary-green"}inline-flex items-center px-1 pt-1 border-transparent hover:border-primary-green border-b-2 text-sm font-medium`
                  
                 }
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
          <ProductsGrid   />
        ) : currentPath.id === "faqs" ? (
          <FAQsPage  />
        ) : currentPath.id === "links" ? (
            <LinksPage />
          ) : currentPath.id === "contactInfo" ? (
            <ContactInfoPage />
          ) : currentPath.id === "links" ? (
            <LinksPage />
          ) : (
          <HomePage />
        )}</div>
  )
}

export default SearchPage
