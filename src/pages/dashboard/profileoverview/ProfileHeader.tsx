interface Props {
  name: string;
  surname: string;
  avatarInitials: string;
}
export default function ProfileHeader({
  name,
  surname,
  avatarInitials,
}: Props) {
  return (
    <header className="mb-12 flex items-center justify-between border-b border-white/10 pb-6">
      <div>
        <div className="mb-2 font-mono text-xs tracking-wider text-white/40 uppercase">
          Welcome Back
        </div>
        <h1 className="text-4xl font-light tracking-tight sm:text-5xl lg:text-6xl">
          {name} {surname}
        </h1>
      </div>
      <div className="hidden sm:block">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-linear-to-br from-white/20 to-white/5 text-xl font-light backdrop-blur-sm">
          {avatarInitials}
        </div>
      </div>
    </header>
  );
}
