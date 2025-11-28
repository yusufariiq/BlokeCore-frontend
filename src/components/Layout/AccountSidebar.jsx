import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export function AccountSidebar() {
  const location = useLocation();
  const user = useSelector(state => state.auth.user);

  const links = [
    { 
      href: "/profile", 
      label: "Profile Setting" 
    },
    { 
      href: "/order", 
      label: "Order" 
    },
  ];

  return (
   <div className="w-4/12 rounded-lg hidden md:flex flex-col">
      <div className="bg-primary px-4 py-2 text-white rounded-md">
        <p className="font-semibold text-2xl">{user ? `Hi, ${user.firstName}!` : "Hi Guest"}</p>
      </div>
      <ul className="flex flex-col my-5 gap-4 p-2">
        {links.map((link) => (
          <li key={link.href} className="font-medium">
            <Link
              to={link.href}
              className={`${
                location.pathname === link.href 
                  ? "active underline text-black hover:text-hover-primary" 
                  : "text-base text-gray-500"
              } ${link.className || ''}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
   </div>
  );
}