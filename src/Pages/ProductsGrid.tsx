import {
  DisplayableFacet,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import {
  ResultsCount,
  AppliedFilters,
  Pagination,
  VerticalResults,
  LocationBias,
  Facets,
  NumericalFacet,
  StandardFacet,
} from "@yext/search-ui-react";
import { useEffect, useState } from "react";

import ProductCard from "../components/Cards/ProductCard";
import Loader from "../components/Loader";
import SortDropdown from "../components/SortDropdown";
import { IoCloseOutline } from "react-icons/io5";
 import { Image } from "@yext/sites-components";

const ProductsGrid = ({ initVals }: any) => {
  const searchActions = useSearchActions();
  const loading = useSearchState((state) => state.searchStatus.isLoading);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const facets = useSearchState((state) => state.filters.facets);
  const [result, setResult] = useState<any>(initVals);
  console.log(JSON.stringify(initVals));
  
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query = urlSearchParams.get("query");
    query && searchActions.setQuery(query);
    searchActions.setVertical("devices");
    searchActions
      .executeVerticalQuery()
      .then((res) => query && setResult(res?.verticalResults.results[0]));
  }, []);

  const transformPriceFacet = (
    options: DisplayableFacet["options"]
  ): DisplayableFacet["options"] => {
    return options.map((option) => {
      const [start, end] = option.displayName.split("-");
      let displayName = "";
      if (start) {
        displayName = `$${start.trim()}`;
      }
      if (end) {
        displayName = displayName + ` - $${end.trim()}`;
      } else {
        displayName = "> " + displayName;
      }
      return {
        ...option,
        displayName,
      };
    });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {initVals ? (
            <div className="hidden md:flex items-center justify-between bg-white px-10">
              <div className="flex flex-col gap-2 w-1/2">
                <div className="text-3xl font-bold">{initVals.name}</div>
                <div className="text-xl font-light">
                  {initVals.rawData.description}
                </div>
                <div className="flex w-full px-1 py-4 ">
                  <a
                    href={initVals.rawData.c_primaryCTA?.link}
                    className="w-fit  items-center px-2 py-2 rounded-full text-black border-black bg-white flex justify-center border  text-center mx-auto uppercase font-medium   hover:shadow-lg "
                  >
                    {initVals.rawData.c_primaryCTA?.label}
                  </a>
                  <a
                    href={initVals.rawData.c_secondaryCTA?.link}
                    className="w-fit  items-center px-3 py-2 rounded-full text-white border-black bg-black  border flex justify-center text-center mx-auto uppercase font-medium   hover:shadow-lg"
                  >
                    {initVals.rawData.c_secondaryCTA?.label}
                  </a>
                </div>
              </div>
              <div className="w-1/2 flex justify-end py-4">
                <Image image={initVals.rawData.c_answersPhoto} />
              </div>
            </div>
          ) : (
            result && (
              <div className="flex items-center justify-between bg-white px-10">
                <div className="flex flex-col gap-2 w-1/2">
                  <div className="text-3xl font-bold">{result.name}</div>
                  <div className="text-xl font-light">
                    {result.rawData.description}
                  </div>
                  <div className="flex w-full px-1 py-4 ">
                    <a
                      href={result.rawData.c_primaryCTA?.link}
                      className="w-fit  items-center px-2 py-2 rounded-full text-black border-black bg-white flex justify-center border  text-center mx-auto uppercase font-medium   hover:shadow-lg "
                    >
                      {result.rawData.c_primaryCTA?.label}
                    </a>
                    <a
                      href={result.rawData.c_secondaryCTA?.link}
                      className="w-fit  items-center px-3 py-2 rounded-full text-white border-black bg-black  border flex justify-center text-center mx-auto uppercase font-medium   hover:shadow-lg"
                    >
                      {result.rawData.c_secondaryCTA?.label}
                    </a>
                  </div>
                </div>
                <div className="w-1/2 flex justify-end py-4">
                  <Image image={result.rawData.c_answersPhoto} />
                </div>
              </div>
            )
          )}
          <div className={` ${showDrawer && `overflow-hidden`}`}>
            {showDrawer && (
              <div className="fixed top-0 left-0 w-full h-full bg-white z-50 p-4 border box-border transition-all duration-900 ease-in-out">
                <div className="relative">
                  <div
                    className="overflow-scroll transition-all duration-500 ease-in-out"
                    style={{ height: `calc(100vh - 8rem)` }}
                  >
                    <div className="text-3xl font-light mb-8 flex justify-between">
                      <div>Filters</div>
                      <IoCloseOutline onClick={() => setShowDrawer(false)} />
                    </div>
                    <div className="w-full h-px bg-gray-200 my-4"></div>
                    <Facets
                      searchOnChange={false}
                      customCssClasses={{
                        titleLabel: `text-black text-lg font-normal`,
                        optionLabel: `text-black text-base font-normal`,
                      }}
                    >
                      <StandardFacet
                        fieldId={"brands"}
                        collapsible={true}
                      ></StandardFacet>
                      <StandardFacet
                        fieldId={"c_productCategory"}
                        collapsible={true}
                      ></StandardFacet>
                      <StandardFacet
                        fieldId={"c_colors"}
                        collapsible={true}
                      ></StandardFacet>
                      <NumericalFacet
                        fieldId="c_price.value"
                        label="Price"
                        collapsible={true}
                        transformOptions={transformPriceFacet}
                      />
                    </Facets>
                  </div>

                  <div className="border-t h-20 bottom-0 p-4 w-full left-0 fixed transition-all duration-500 ease-in-out">
                    <div className="flex w-full gap-4 justify-between">
                      <div
                        onClick={() => {
                          facets && searchActions.setFacets(facets);
                          setShowDrawer(false);
                          searchActions.executeVerticalQuery();
                        }}
                        className="w-1/2 border bg-black text-white border-black rounded-full px-4 py-2 text-center"
                      >
                        View results
                      </div>
                      <div
                        onClick={() => searchActions.resetFacets()}
                        className="w-1/2 border bg-white text-black border-black rounded-full px-5 py-2 text-center"
                      >
                        Clear all
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className={`flex mt-4 `}>
              <div className="w-72 mr-5 hidden md:block">
                <Facets customCssClasses={{ facetsContainer: "mr-10" }}>
                  <NumericalFacet
                    fieldId="c_price.value"
                    label="Price"
                    transformOptions={transformPriceFacet}
                  />
                </Facets>
              </div>
              <div className={`w-full ${showDrawer && `overflow-hidden`}`}>
                <div className="md:hidden block">
                  <div className=" w-full flex justify-between items-center mb-4">
                    <div
                      onClick={() => setShowDrawer(true)}
                      className="md:hidden border text-black border-black px-4 py-1 rounded-full hover:cursor-pointer"
                    >
                      Filters
                    </div>
                    <SortDropdown />
                  </div>
                  <ResultsCount />
                </div>
                <div className="hidden md:flex w-full items-baseline justify-between">
                  <ResultsCount />
                  <SortDropdown />
                </div>
                <div className="flex justify-between mb-4">
                  <AppliedFilters />
                </div>
                <div className="flex flex-col space-y-4 ">
                  <VerticalResults
                    CardComponent={ProductCard}
                    customCssClasses={{
                      verticalResultsContainer: `grid grid-cols-1 md:grid-cols-3 gap-4`,
                    }}
                  />
                  <div>
                    <Pagination />
                    <LocationBias />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductsGrid;
