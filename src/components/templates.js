import Image from "next/image";
export const ContentNavBar = ({ account }) => {
  //console.log(account);
  return (
    <div className="navbar bg-primary-content">
      <div className="navbar-start">
      <Image
            src="/images/LogoF-white.png"
            alt="Fixtura"
            width={50}
            height={12}
            priority
          />
        <div className="dropdown">
          
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
       
      </div>
     {/*  <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Item 1</a>
          </li>
          <li tabIndex={0}>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div> */}
      <div className="navbar-end">
        <a className="btn">Fixtura</a>
      </div>
    </div>
  );
};
