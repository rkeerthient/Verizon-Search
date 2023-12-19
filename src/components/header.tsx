import { IoIosSearch } from "react-icons/io";

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
    label: "Mobile",
    url: "#",
  },
  {
    label: "Internet",
    url: "#",
  },
  {
    label: "Solutions",
    url: "#",
  },
  {
    label: "Insights",
    url: "#",
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
    <div className="relative">
      <div className=" mb-8">
        <header className=" py-5 px-0 bg-black">
          <div className="font-bold items-center text-white centered-container w-full flex justify-between">
            <div className="hidden md:flex">
              <a href="https://www.verizon.com" className="mr-4 mx-auto">
                <img
                  className="md:w-8 w-4"
                  src="data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iNDI4IiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDQyOCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDI1MEg3Ny43MkwxNTUuNDMgNDE2LjY3TDM0OS43MyAwSDQyNy40NUwxOTQuMjkgNTAwSDExNi41OEwwIDI1MFoiIGZpbGw9IiNFRTAwMDAiLz4KPC9zdmc+Cg=="
                  alt="Link to verizon website"
                />
              </a>
            </div>
            <a
              href="https://www.verizon.com"
              className="flex md:hidden mr-auto "
            >
              <img
                className="md:w-8 w-4"
                src="data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iNDI4IiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDQyOCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDI1MEg3Ny43MkwxNTUuNDMgNDE2LjY3TDM0OS43MyAwSDQyNy40NUwxOTQuMjkgNTAwSDExNi41OEwwIDI1MFoiIGZpbGw9IiNFRTAwMDAiLz4KPC9zdmc+Cg=="
                alt="Link to verizon website"
              />
            </a>
            <div className="hidden md:flex gap-4">
              {links.map((item, index) => (
                <a key={index} href={item.url} className=" hover:underline">
                  {item.label}
                </a>
              ))}
            </div>
            <div className="flex md:hidden gap-4">
              {links.splice(0, 2).map((item, index) => (
                <a key={index} href={item.url} className=" hover:underline">
                  {item.label}
                </a>
              ))}
            </div>
            <div className="flex gap-4 items-center">
              <div>LogIn</div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
