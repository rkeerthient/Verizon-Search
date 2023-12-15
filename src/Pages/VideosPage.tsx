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
import { VideoCard } from "../components/Cards/VideoCard";

const VideosPage = () => {
  const searchActions = useSearchActions();
  const loading = useSearchState((state) => state.searchStatus.isLoading);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query = urlSearchParams.get("query");
    query && searchActions.setQuery(query);
    searchActions.setVertical("videos");
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
              <div className="flex flex-col space-y-4">
                <VerticalResults
                  CardComponent={VideoCard}
                  customCssClasses={{
                    verticalResultsContainer: `grid grid-cols-1 md:grid-cols-3 gap-2`,
                  }}
                />
                <div>
                  <Pagination />
                  <LocationBias />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default VideosPage;
