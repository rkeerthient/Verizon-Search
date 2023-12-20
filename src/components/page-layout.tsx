import * as React from "react";
import Header from "./header";
import Footer from "./footer";
import {
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";
import searchConfig from "./searchConfig";

type Props = {
  _site?: any;
  children?: React.ReactNode;
};

const PageLayout = ({ _site, children }: Props) => {
  return (
    <>
      <SearchHeadlessProvider searcher={provideHeadless(searchConfig)}>
        <div className="min-h-screen !bg-[#f6f6f6]">
          <Header _site={_site} />
          {children}
          <Footer _site={_site}></Footer>
        </div>
      </SearchHeadlessProvider>
     </>
  );
};

export default PageLayout;
