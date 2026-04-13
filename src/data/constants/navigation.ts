//Establish the keys for the list
const listItemKeys = {
  concerts: crypto.randomUUID(),
  charts: crypto.randomUUID(),
  mymusic: crypto.randomUUID(),
  contacts: crypto.randomUUID(),
};
//Array containing the content within the links and keys assigned to the list items
const navLinksContent = [
  { content: "Clubs", key: listItemKeys.concerts },
  { content: "Membership", key: listItemKeys.charts },
  { content: "Classes", key: listItemKeys.mymusic },
  { content: "Sign In", key: listItemKeys.contacts },
];

type Prop = {
  current: HTMLAnchorElement | null;
};
//The links in the main sidebar( header sidebar) must referenced, since the links are generated through looping the refs must be dynamically generated too
export default function NavLinksContentRef(
  concertsLinkRef: Prop,
  chartsLinkRef: Prop,
  myMusicLinkRef: Prop,
  contactsLinkRef: Prop,
) {
  const refs = [
    concertsLinkRef,
    chartsLinkRef,
    myMusicLinkRef,
    contactsLinkRef,
  ];
  return navLinksContent.map((content, index) => {
    return { ...content, ref: refs[index] };
  });
}

export { navLinksContent };
