import { AlertTriangle, Loader, MailIcon, XIcon } from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";
import { useGetMember } from "../api/use-get-member";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface ProfileProps {
  memberId: Id<"members">;
  onClose: () => void;
}

export const Profile = ({ memberId, onClose }: ProfileProps) => {
  const { data: member, isLoading: isLoadingMember } = useGetMember({
    id: memberId,
  });

  if (isLoadingMember) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center h-[50px] px-3 border-b text-black">
          <p className="text-lg font-bold">Profile</p>
          <Button onClick={onClose} size="iconSm" variant="ghost">
            <XIcon className="size-5 stroke-[1.5]" />
          </Button>
        </div>
        <div className="flex flex-col gap-y-2 h-full items-center justify-center">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center h-[50px] px-3 border-b text-black">
          <p className="text-lg font-bold">Profile</p>
          <Button onClick={onClose} size="iconSm" variant="ghost">
            <XIcon className="size-5 stroke-[1.5]" />
          </Button>
        </div>
        <div className="flex flex-col gap-y-2 h-full items-center justify-center">
          <AlertTriangle className="size-5 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Profile not found</p>
        </div>
      </div>
    );
  }

  const avatarFallback = member.user.name?.[0] ?? "M";

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center h-[50px] px-3 border-b text-black">
        <p className="text-lg font-bold">Profile</p>
        <Button onClick={onClose} size="iconSm" variant="ghost">
          <XIcon className="size-5 stroke-[1.5]" />
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center p-5">
        <Avatar className="max-w-[280px] max-h-[260px] size-full">
          <AvatarImage src={member.user.image} />
          <AvatarFallback className="aspect-square bg-emerald-600 text-6xl">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col p-5 ">
        <p className="text-xl font-bold text-black">{member.user.name}</p>
      </div>
      <Separator />
      <div className="flex flex-col p-5 text-black">
        <p className="text-sm font-bold mb-5">Contact information</p>
        <div className="flex items-center gap-2">
          <div className="size-10 rounded-md bg-muted flex items-center justify-center">
            <MailIcon className="size-5" />
          </div>
          <div className="flex flex-col">
            <p className="text-[15px] font-semibold text-muted-foreground">
              Email Address
            </p>
            <Link
              href={`mailto:${member.user.email}`}
              className="text-sm hover:underline text-[#1264a3]"
            >
              {member.user.email}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
