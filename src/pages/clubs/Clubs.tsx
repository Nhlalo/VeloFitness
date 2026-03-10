import { Search } from "lucide-react";
import { acquireNumberGyms } from "../../data/constants/gymlocation";

function Header() {
  return (
    <header>
      <h1>{acquireNumberGyms()} Clubs Worldwide: Find a Club Near You</h1>
      <div>
        <Search aria-hidden="true" />
        <input type="text" />
      </div>
    </header>
  );
}
export default function Clubs() {
  return (
    <>
      <Header />
    </>
  );
}
