import HeroBanner from "./HeroBanner";
import Classes from "./Classes";
import JoinUs from "./JoinUs";
import Membership from "./Membership";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <main className="bg-black text-white">
        <Classes />
        <JoinUs />
        <Membership />
      </main>
    </div>
  );
}
