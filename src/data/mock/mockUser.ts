interface User {
  name: string;
  surname: string;
  email: string;
  zipCode: string;
  phoneNumber: string;
  selectedClub: string;
  memberSince: string;
  avatarInitials: string;
}

const mockUser: User = {
  name: "Isabella",
  surname: "Rossi",
  email: "isabella.rossi@velo.com",
  zipCode: "10001",
  phoneNumber: "+1 (212) 555-0890",
  selectedClub: "Velo Soho",
  memberSince: "March 2024",
  avatarInitials: "IR",
};
export { mockUser };
