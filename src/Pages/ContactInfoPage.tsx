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
import ContactInfoCard from "../components/Cards/ContactInfoCard";

const ContactInfoPage = () => {
  const searchActions = useSearchActions();
  const loading = useSearchState((state) => state.searchStatus.isLoading);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query = urlSearchParams.get("query");
    query && searchActions.setQuery(query);
    searchActions.setVertical("contact_information");
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
                CardComponent={ContactInfoCard}
                customCssClasses={{
                  verticalResultsContainer: ` bg-white`,
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

export default ContactInfoPage;
