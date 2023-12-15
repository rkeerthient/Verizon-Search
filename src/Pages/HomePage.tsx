import { useEffect } from "react";
import Loader from "../components/Loader";
import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import {
  DirectAnswer,
  ResultsCount,
  UniversalResults,
} from "@yext/search-ui-react";
import ProductCard from "../components/Cards/ProductCard";
import ContactInfoCard from "../components/Cards/ContactInfoCard";
import { VideoCard } from "../components/Cards/VideoCard";
import LinkCard from "../components/Cards/LinkCard";
import LocationCard from "../components/Cards/LocationCard";
import FAQCard from "../components/Cards/FAQCard";
import { universalLimit } from "./SearchPage";

const HomePage = () => {
  const searchActions = useSearchActions();
  const loading = useSearchState((state) => state.searchStatus.isLoading);
  const results = useSearchState((state) => state.universal.verticals) || [];
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
    searchActions.executeUniversalQuery();
  }, []);
  return (
    <div>
      {loading ? (
        <Loader></Loader>
      ) : (
        <>
          {results.length ? (
            <div>
              <DirectAnswer customCssClasses={{ answerContainer: "my-4" }} />
              <ResultsCount />
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
                  links: {
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
                    CardComponent: LocationCard,
                    SectionComponent: GridSection,
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
