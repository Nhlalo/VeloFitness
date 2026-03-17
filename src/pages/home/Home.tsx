import { HeroBannerProps } from "../../types/herobanner.interface";
import HeroBanner from "../../components/shared/HeroBanner";
import Classes from "./Classes";
import JoinUs from "./JoinUs";
import Membership from "./Membership";
import WorkOutVideo from "../../assets/videos/home-herobanner.mp4";

const herobannerProps: HeroBannerProps = {
  videoSource: WorkOutVideo,
  heading1: "DESIGN YOUR",
  heading2: "PHYSIQUE",
  buttonText: "GET STARTED",
};

export default function Home() {
  return (
    <div>
      <HeroBanner
        videoSource={WorkOutVideo}
        heading1={herobannerProps.heading1}
        heading2={herobannerProps.heading2}
        buttonText={herobannerProps.buttonText}
      />
      <main className="bg-black text-white">
        <Classes />
        <JoinUs />
        <Membership />
      </main>
    </div>
  );
}
