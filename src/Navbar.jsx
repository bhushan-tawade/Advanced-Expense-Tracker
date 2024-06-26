import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="h-14 mb-0 mx-0 text-white  flex justify-around items-center">
      <div className="flex items-center justify-center gap-3">
        <img className="w-10 h-10 " src="./save-money.png" alt="money" />
        <h1 className="text-3xl font-bold title">Expense Tracker</h1>
      </div>
      <ul>
        <li className="hover:scale-110 hover:cursor-pointer">
          <Link to="/">HOME</Link>
        </li>
        <li className="hover:scale-110 hover:cursor-pointer">
          <Link to="/history">STATE</Link>
        </li>
      </ul>
    </nav>
  );
}
