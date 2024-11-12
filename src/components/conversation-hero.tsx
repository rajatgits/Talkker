import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

interface ConversationHeroProps {
  name?: string;
  image?: string;
}

export const ConversationHero = ({
  name = "Member",
  image,
}: ConversationHeroProps) => {
  const avatarFallback = name.charAt(0).toUpperCase();

  return (
    <div className="mt-[88px] mx-5 mb-3">
      <div className="flex items-center gap-x-1 mb-2">
        <Avatar className="size-15 mr-2">
          <AvatarImage src={image} />
          <AvatarFallback className="rounded-md p-6 bg-emerald-500">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
        <p className="text-2xl font-bold text-black">{name}</p>
      </div>
      <p className="font-normal text-slate-800 mb-5">
        This conversation is just between you and <strong>{name}</strong>
      </p>
    </div>
  );
};
