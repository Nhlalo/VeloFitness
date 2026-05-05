import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faXTwitter,
  faInstagram,
  faSnapchat,
} from "@fortawesome/free-brands-svg-icons";
import handleScrollToTop from "../../../utils/scrollToTop";
import Logo from "../../../assets/images/logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-black pt-6 pb-17 text-white">
      <div className="m-auto w-[min(90vw,1128px)]">
        <div className="flex w-full flex-col md:flex-row">
          <div className="mr-[7%] ml-[13%] flex grow flex-col md:mr-0 md:ml-0 md:block">
            <button
              aria-label="Scroll to the top"
              onClick={handleScrollToTop}
              className="mx-0 mt-3 mb-7 flex items-center"
            >
              <div
                aria-hidden="true"
                className="flex w-fit items-center justify-center rounded-full bg-white p-1"
              >
                <img
                  src={Logo}
                  alt="  Vélo Fitness"
                  className="height-11 w-11 fill-white"
                />
              </div>
              <span
                aria-hidden="true"
                className="ml-2 text-2xl font-black text-white"
              >
                Vélo Fitness
              </span>
            </button>
            <p className="max-w-[55ch] leading-relaxed">
              More than just a gym—we're a wellness destination. From
              high-intensity workouts to recovery zones and nutrition guidance,
              we support your complete health journey in one modern facility.
              Whether you're a first-timer or a seasoned athlete, our community
              welcomes you to become the strongest version of yourself.
            </p>
          </div>

          <div className="flex grow">
            <div className="mt-7 mr-[7%] ml-[13%] flex grow flex-col md:m-0 md:block">
              <h3 className="my-0 text-lg font-normal text-[#949494] md:my-5">
                Company
              </h3>
              <ul className="pl-0">
                <li className="px-0 py-2 text-lg">
                  <a href="">About Us</a>
                </li>
                <li className="px-0 py-2 text-lg">
                  <a href="">Apps</a>
                </li>
              </ul>
            </div>
            <div className="mt-7 mr-[7%] ml-[13%] flex grow flex-col md:m-0 md:block">
              <h3 className="my-0 text-lg font-normal text-[#949494] md:my-5">
                Legal
              </h3>
              <ul className="pl-0">
                <li className="px-0 py-2 text-lg">
                  <a href="">Terms</a>
                </li>
                <li className="px-0 py-2 text-lg">
                  <a href="">Privacy Policy</a>
                </li>
                <li className="px-0 py-2 text-lg">
                  <a href="">Manage Your Data</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-18">
          <p className="flex justify-center pb-6 text-lg text-[#949494]">
            Follow Us
          </p>
          <ul className="mb-6 flex justify-center gap-7 pl-0">
            <li title="Facebook">
              <a href="">
                {" "}
                <FontAwesomeIcon
                  icon={faFacebookF}
                  style={{ width: "28px", height: "28px", fill: "white" }}
                />
              </a>
            </li>
            <li title="X">
              <a href="">
                {" "}
                <FontAwesomeIcon
                  icon={faXTwitter}
                  style={{ width: "28px", height: "28px", fill: "white" }}
                />
              </a>
            </li>
            <li title="Instagram">
              <a href="">
                <FontAwesomeIcon
                  icon={faInstagram}
                  style={{ width: "28px", height: "28px", fill: "white" }}
                />
              </a>
            </li>
            <li title="SnapChat">
              <a href="">
                <FontAwesomeIcon
                  icon={faSnapchat}
                  style={{ width: "28px", height: "28px", fill: "white" }}
                />
              </a>
            </li>
          </ul>
          <p className="mb-7 flex justify-center">
            {" "}
            &copy; {currentYear} Website Name. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
