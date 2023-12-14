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
              <div className="flex flex-col items-baseline">
                <ResultsCount />
                <AppliedFilters />
              </div>
              <VerticalResults
                CardComponent={LinkCard}
                customCssClasses={{
                  verticalResultsContainer: `grid grid-cols-3`,
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
