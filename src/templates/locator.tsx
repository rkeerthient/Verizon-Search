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
import StoreLocator from "../components/StoreLocator";

export const config: TemplateConfig = {
  name: "locator",
};
export const getPath: GetPath<TemplateRenderProps> = () => {
  return `locator`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
}): HeadConfig => {
  return {
    title: "Verizon | Locator",
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

const Locator: Template<TemplateRenderProps> = ({
  document,
}: TemplateRenderProps) => {
  const { _site } = document;

  return (
    <>
      <PageLayout _site={_site}>
        <div className="mx-auto max-w-7xl px-4">
          <StoreLocator />
        </div>
      </PageLayout>
    </>
  );
};
export default Locator;
