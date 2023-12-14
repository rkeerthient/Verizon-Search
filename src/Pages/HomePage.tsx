import  { useEffect } from 'react'
import Loader from '../components/Loader'
import {   useSearchActions, useSearchState } from '@yext/search-headless-react';
import { DirectAnswer, ResultsCount, UniversalResults } from '@yext/search-ui-react';
import ProductCard from '../components/Cards/ProductCard';
import PromoCard from '../components/Cards/PromoCard';
import ServiceCard from '../components/Cards/ServiceCard';
import FAQCard from '../components/FAQCard';

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
            <div className="grid grid-cols-2 gap-1 md:grid-cols-3 md:gap-8 ">
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
          <div className="centered-container">
            <DirectAnswer />
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
                products: {
                  CardComponent: ProductCard,
                  SectionComponent: GridSection,
                  label: "Products",
                  viewAllButton: true,
                },
                service: {
                  CardComponent: ServiceCard,
                  SectionComponent: FlexSection,
                  label: "Services",
                  viewAllButton: true,
                },
                promotion: {
                  CardComponent: PromoCard,
                  label: "",
                },
              }}
            />
          </div>
        ) : (
          <div className="space-y-4 ">
          
          </div>
        )}
      </>
    )}
  </div>
  )
}

export default HomePage
