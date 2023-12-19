import { useEffect } from "react";
import Loader from "../components/Loader";
import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import {
  AppliedFilters,
  DirectAnswer,
  MapboxMap,
  ResultsCount,
  UniversalResults,
} from "@yext/search-ui-react";
import ProductCard from "../components/Cards/ProductCard";
import ContactInfoCard from "../components/Cards/ContactInfoCard";
import { VideoCard } from "../components/Cards/VideoCard";
import LinkCard from "../components/Cards/LinkCard";
import FAQCard from "../components/Cards/FAQCard";
import { universalLimit } from "./SearchPage";
import LocationUniversalCard from "../components/Cards/LocationUniversal";
import Mapboxuniv from "../components/Cards/Mapboxuniv";
import { useState } from "react";

const HomePage = ({ initVals }: any) => {
  const searchActions = useSearchActions();
  const loading = useSearchState((state) => state.searchStatus.isLoading);
  const results = useSearchState((state) => state.universal.verticals) || [];
  const [result, setResult] = useState<any>(initVals);

  const GridSection = ({ results, CardComponent, header }: any) => {
    if (!CardComponent) {
      return <div>Missing Card Component</div>;
    }
    return (
      <div>
        <div>{header}</div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-8 ">
          {results.map((r: any, index: number) => (
            <CardComponent key={index} result={r} />
          ))}
        </div>
      </div>
    );
  };
  const LocationSection = ({ results, CardComponent, header }: any) => {
    return (
      <div>
        <div>{header}</div>
        <div className="h-[400px] w-full hidden md:block">
          <Mapboxuniv data={results}></Mapboxuniv>
        </div>
        <div className="flex flex-col mt-4 gap-2">
          {results.map((r: any, index: number) => (
            <CardComponent key={index} result={r} />
          ))}
        </div>
      </div>
    );
  };
  const FlexSection = ({ results, CardComponent, header }: any) => {
    if (!CardComponent) {
      return <div>Missing Card Component</div>;
    }
    return (
      <div>
        <div>{header}</div>
        <div className="flex flex-col gap-4">
          {results.map((r: any, index: number) => (
            <CardComponent key={index} result={r} />
          ))}
        </div>
      </div>
    );
  };
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query = urlSearchParams.get("query");
    query && searchActions.setQuery(query);
    searchActions.setUniversalLimit(universalLimit);
    searchActions.setUniversal();
    searchActions
      .executeUniversalQuery()
      .then((res) =>
        query && res?.verticalResults[0].verticalKey === "devices"
          ? setResult(res?.verticalResults[0].results[0])
          : setResult(undefined)
      );
  }, []);
  return (
    <div>
      {loading ? (
        <Loader></Loader>
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
                <img src={initVals.rawData.c_answersPhoto.url} />
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
                  <img src={initVals.rawData.c_answersPhoto.url} />
                </div>
              </div>
            )
          )}
          {results.length ? (
            <div>
              <DirectAnswer customCssClasses={{ answerContainer: "my-4" }} />
              <ResultsCount />
              <AppliedFilters
                customCssClasses={{ appliedFiltersContainer: `!flex flex-row` }}
              ></AppliedFilters>
              <UniversalResults
                showAppliedFilters={true}
                customCssClasses={{
                  universalResultsContainer: "w-full mx-auto my-6 ",
                }}
                verticalConfigMap={{
                  faqs: {
                    CardComponent: FAQCard,
                    viewAllButton: true,
                    label: "FAQs",
                  },
                  devices: {
                    CardComponent: ProductCard,
                    SectionComponent: GridSection,
                    label: "Products",
                    viewAllButton: true,
                  },
                  videos: {
                    CardComponent: VideoCard,
                    SectionComponent: GridSection,
                    label: "Videos",
                    viewAllButton: true,
                  },
                  link: {
                    CardComponent: LinkCard,
                    SectionComponent: GridSection,
                    label: "Links",
                    viewAllButton: true,
                  },
                  contact_information: {
                    CardComponent: ContactInfoCard,
                    SectionComponent: FlexSection,
                    label: "Contact Information",
                    viewAllButton: true,
                  },
                  locations: {
                    CardComponent: LocationUniversalCard,
                    SectionComponent: LocationSection,
                    label: "Locations",
                    viewAllButton: true,
                  },
                }}
              />
            </div>
          ) : (
            <div className="space-y-4 "></div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
