import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed left-0 top-0 h-full w-72 bg-white shadow-apple p-8">
      <div className="mb-12">
        <h1 className="text-2xl font-semibold text-apple-gray-500">Study With Me</h1>
        <p className="text-apple-gray-300 mt-2">스터디의 모든 것</p>
      </div>
      <ul className="space-y-2">
        <NavItem to="/study-recruit" icon="📚">
          스터디 모집
        </NavItem>
        <NavItem to="/study-room" icon="🏢">
          스터디룸
        </NavItem>
        <NavItem to="/external-study" icon="🌐">
          외부 스터디룸
        </NavItem>
      </ul>
    </nav>
  );
};

interface NavItemProps {
  to: string;
  icon: string;
  children: React.ReactNode;
}

const NavItem = ({ to, icon, children }: NavItemProps) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center px-6 py-4 rounded-2xl transition-all duration-200 group ${
            isActive
              ? 'bg-apple-blue bg-opacity-10 text-apple-blue'
              : 'text-apple-gray-400 hover:bg-apple-gray-50'
          }`
        }
      >
        <span className="text-xl mr-4">{icon}</span>
        <span className="text-base font-medium">{children}</span>
        <span className="ml-auto transform transition-transform duration-200 opacity-0 group-hover:opacity-100">
          →
        </span>
      </NavLink>
    </li>
  );
};

export default Navbar;
