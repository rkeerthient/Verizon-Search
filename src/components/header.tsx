import * as React from "react";
import Cta from "../components/cta";

type Link = {
  label: string;
  url: string;
};

const links: Link[] = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "About",
    url: "/turtlehead-tacos",
  },
];

const Header = () => {
  const linkDoms = links.map((link) => (
    <div key={link.label}>
      <a href={link.url} target="_blank" rel="noreferrer">
        {link.label}
      </a>
    </div>
  ));

  return (
    <>
      <div >
      <header className="py-5 px-0 bg-blacks">
 					<div className="centered-container">
						<a href="https://www.verizon.com" className="mr-4 mx-auto">
							<img className="w-8" src="data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iNDI4IiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDQyOCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDI1MEg3Ny43MkwxNTUuNDMgNDE2LjY3TDM0OS43MyAwSDQyNy40NUwxOTQuMjkgNTAwSDExNi41OEwwIDI1MFoiIGZpbGw9IiNFRTAwMDAiLz4KPC9zdmc+Cg==" alt="Link to verizon website"  />
						</a>
					 
					</div>
 			</header>
      </div>
    </>
  );
};

export default Header;
