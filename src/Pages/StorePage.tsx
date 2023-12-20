import {
  OnSelectParams,
  VerticalResults,
  ResultsCount,
  Pagination,
  LocationBias,
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
import { useState } from "react";
import { LocatorProvider } from "../context/useLocator";
import { useGetSearchResults } from "../components/utils/getSearchResults";
import CustomMarker from "../components/CustomMarker";
import { Map } from "@yext/sites-components";
import { MapboxMaps } from "@yext/components-tsx-maps";

const StoreLocator = (): JSX.Element => {
  const searchActions = useSearchActions();
  const loading = useSearchState((state) => state.searchStatus.isLoading);
  const [selectedEntityId, setSelectedEntityId] = useState("");
  const [focusedEntityId, setFocusedEntityId] = useState("");
  const [hoveredEntityId, setHoveredEntityId] = useState("");
  const results = useGetSearchResults(true);

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
  useEffect(() => {
    setSelectedEntityId("");
    setFocusedEntityId("");
    setHoveredEntityId("");
  }, [searchActions.state.query.queryId]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <LocatorProvider
          value={{
            selectedId: selectedEntityId,
            setSelectedId: setSelectedEntityId,
            focusedId: focusedEntityId,
            setFocusedId: setFocusedEntityId,
            hoveredId: hoveredEntityId,
            setHoveredId: setHoveredEntityId,
          }}
        >
          <div className="flex h-[calc(100vh-242px)]">
            <div className="w-full md:flex md:w-2/5 flex-col">
              <ResultsCount />

              <VerticalResults
                customCssClasses={{
                  verticalResultsContainer:
                    "overflow-y-auto flex flex-col gap-4",
                }}
                CardComponent={LocationCard}
              />
            </div>
            <div className="hidden md:block md:w-3/5">
              <Map
                provider={MapboxMaps}
                defaultZoom={10}
                bounds={results.map((data) => data.geocodedCoordinate)}
                padding={{ top: 100, bottom: 200, left: 50, right: 50 }}
                className="h-full"
                apiKey="pk.eyJ1Ijoic3VubnlrZWVydGhpIiwiYSI6ImNsNWh5ZGt3czAyejUzY3A3Y3pvZ2E0bTgifQ.TNHfh1HL0LwTzLxs2TOaBQ"
              >
                {results.map((data, index) => (
                  <CustomMarker
                    key={data.id}
                    coordinate={data.coordinate}
                    id={data.id}
                    index={index + 1}
                  />
                ))}
              </Map>
            </div>
          </div>
          <div className="mt-4 gap-2">
            <Pagination />
            <LocationBias />
          </div>
        </LocatorProvider>
      )}
    </>
  );
};

export default StoreLocator;
