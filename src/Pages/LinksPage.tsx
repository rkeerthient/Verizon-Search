import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import {
  ResultsCount,
  AppliedFilters,
  Pagination,
  VerticalResults,
  LocationBias,
} from "@yext/search-ui-react";
import { useEffect } from "react";
import Loader from "../components/Loader";
import LinkCard from "../components/Cards/LinkCard";

const LinksPage = () => {
  const searchActions = useSearchActions();
  const loading = useSearchState((state) => state.searchStatus.isLoading);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query = urlSearchParams.get("query");
    query && searchActions.setQuery(query);
    searchActions.setVertical("link");
    searchActions.executeVerticalQuery();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex mt-4">
            <div className="w-full">
              <div className="flex  items-baseline justify-between">
                <ResultsCount />
              </div>
              <div className="flex justify-between mb-4">
                <AppliedFilters />
              </div>
              <VerticalResults
                CardComponent={LinkCard}
                customCssClasses={{
                  verticalResultsContainer: `grid grid-cols-1 md:grid-cols-3 gap-4`,
                }}
              />
              <Pagination />
              <LocationBias />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LinksPage;
