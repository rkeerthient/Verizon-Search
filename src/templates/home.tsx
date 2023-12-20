/**
 * This is an example of how to create a static template that uses getStaticProps to retrieve data.
 */
import "../index.css";
import {
  Template,
  GetPath,
  TemplateConfig,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import PageLayout from "../components/page-layout";
import LinksPage from "../Pages/LinksPage";
import SearchPage from "../Pages/SearchPage";
import HeaderHome from "../components/headerHome";
import Footer from "../components/footer";
import {
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";
import searchConfig from "../components/searchConfig";
import { useState } from "react";

export const config: TemplateConfig = {
  name: "index",
};
export const getPath: GetPath<TemplateRenderProps> = () => {
  return `index.html`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
}): HeadConfig => {
  return {
    title: "Verizon | Home",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          href: relativePrefixToRoot,
        },
      },
    ],
  };
};

const HomePage: Template<TemplateRenderProps> = ({}: TemplateRenderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleIsOpen = (status: boolean) => {
    setIsOpen(status);
  };
  return (
    <SearchHeadlessProvider searcher={provideHeadless(searchConfig)}>
      <HeaderHome isSearchOpen={() => handleIsOpen}></HeaderHome>
      <div className="centered-container ">
        <img
          src="https://i.imgur.com/lzgudD1.png"
          alt=""
          className={`w-full h-full object-cover ${
            isOpen && `fixed !h-0 overflow-hidden`
          }`}
        />
      </div>
      <Footer></Footer>
    </SearchHeadlessProvider>
  );
};
export default HomePage;
