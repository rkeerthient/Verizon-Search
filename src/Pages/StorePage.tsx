import {
  MapboxMap,
  FilterSearch,
  OnSelectParams,
  VerticalResults,
  ResultsCount,
} from "@yext/search-ui-react";
import {
  Matcher,
  SelectableStaticFilter,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import "mapbox-gl/dist/mapbox-gl.css";
import LocationCard from "../components/Cards/LocationCard";
import { useEffect } from "react";
import Loader from "../components/Loader";

const StoreLocator = (): JSX.Element => {
  const searchActions = useSearchActions();
  const loading = useSearchState((state) => state.searchStatus.isLoading);
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query = urlSearchParams.get("query");
    query && searchActions.setQuery(query);
    searchActions.setVertical("locations");
    searchActions.executeVerticalQuery();
  }, []);
  const handleFilterSelect = (params: OnSelectParams) => {
    const locationFilter: SelectableStaticFilter = {
      selected: true,
      filter: {
        kind: "fieldValue",
        fieldId: params.newFilter.fieldId,
        value: params.newFilter.value,
        matcher: Matcher.Equals,
      },
    };
    searchActions.setStaticFilters([locationFilter]);
    searchActions.executeVerticalQuery();
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex h-[calc(100vh-242px)]">
          <div className="flex w-2/5 flex-col">
            <ResultsCount />
            {/* <FilterSearch
              onSelect={handleFilterSelect}
              placeholder="Find Locations Near You"
              searchFields={[
                {
                  entityType: "location",
                  fieldApiName: "builtin.location",
                },
              ]}
            /> */}
            <VerticalResults
              customCssClasses={{
                verticalResultsContainer: "overflow-y-auto flex flex-col gap-4",
              }}
              CardComponent={LocationCard}
            />
          </div>
          <div className="w-3/5">
            <MapboxMap
              mapboxAccessToken={
                "pk.eyJ1Ijoic3VubnlrZWVydGhpIiwiYSI6ImNsNWh5ZGt3czAyejUzY3A3Y3pvZ2E0bTgifQ.TNHfh1HL0LwTzLxs2TOaBQ"
              }
            />
          </div>
        </div>
      )}
    </>
  );
};

export default StoreLocator;
