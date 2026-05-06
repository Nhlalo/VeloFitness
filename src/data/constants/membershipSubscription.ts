import PremiumClub from "../../assets/images/jointoday-premiumgym.jpg";
import EliteClub from "../../assets/images/jointoday-elitemembership.jpg";
import StandardClub from "../../assets/images/jointoday-signature.jpg";

export interface MembershipData {
  id: number;
  image: string;
  title: string;
  club: string;
  price: string;
  features: string[];
  billing: string;
}

const membershipData: MembershipData[] = [
  {
    id: 1,
    image: StandardClub,
    title: "L'Ordre des Champions", // The Order of Champions
    club: "Signature Experience",
    price: "$79",
    features: [
      "12 classes / month",
      "2 guest passes / month",
      "Fitness assessment (one-time)",
      "Access to one home club",
      "Standard locker service",
      "48h cancellation window",
    ],
    billing: "per month",
  },

  {
    id: 2,
    image: EliteClub,
    club: "Elite Member Benefits",
    title: "La Société Privée", // The Private Society
    price: "$99",
    features: [
      "Unlimited classes",
      "4 guest passes / month",
      "Complimentary fitness assessment",
      "Access to one home club",
      "Standard locker service",
      "24h cancellation window",
    ],
    billing: "per month",
  },

  {
    id: 3,
    image: PremiumClub,
    club: "Premium Club Access",
    title: "Le Cercle d'Or", // The Golden Circle
    price: "$129",
    features: [
      "Unlimited classes",
      "8 guest passes / month",
      "Complimentary fitness assessment",
      "Access to all Velo clubs",
      "Premium locker service",
      "Priority class booking",
      "Free towel service",
    ],
    billing: "per month",
  },
];

export { membershipData };
