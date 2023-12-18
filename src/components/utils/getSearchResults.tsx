import { useSearchState } from "@yext/search-headless-react";
import type { Coordinate } from "@yext/types";

type LocatorSearchResultType = {
  geocodedCoordinate: Coordinate;
  coordinate: Coordinate;
  id: string;
};
export function useGetSearchResults(displayAllOnNoResults: boolean) {
  const state = useSearchState((state) => state);
  const searchResults = state.vertical.results || [];
  const allResults =
    state.vertical.noResults?.allResultsForVertical.results || [];
  const resultsToMap =
    !searchResults.length && displayAllOnNoResults ? allResults : searchResults;
  const dataToRender = resultsToMap.map((result) => {
    return {
      geocodedCoordinate: result.rawData.geocodedCoordinate,
      coordinate: result.rawData.yextDisplayCoordinate,
      id: result.id,
    } as LocatorSearchResultType;
  });

  return dataToRender;
}
