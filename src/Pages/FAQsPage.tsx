import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import {
  ResultsCount,
  AppliedFilters,
  Pagination,
  VerticalResults,
  LocationBias,
} from "@yext/search-ui-react";
import { useEffect } from "react";
import FAQCard from "../components/Cards/FAQCard";
import Loader from "../components/Loader";

const FAQsPage = () => {
  const searchActions = useSearchActions();
  const loading = useSearchState((state) => state.searchStatus.isLoading);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query = urlSearchParams.get("query");
    query && searchActions.setQuery(query);
    searchActions.setVertical("faqs");
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
                CardComponent={FAQCard}
                customCssClasses={{
                  verticalResultsContainer: `  bg-white  `,
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

export default FAQsPage;
