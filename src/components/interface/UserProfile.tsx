import { Avatar } from '@nextui-org/react';

type UserProfileProps = {
  username: string;
}

const UserProfile = (props: UserProfileProps) => {
  return (
    <div className="flex items-center">
      <Avatar isBordered color="primary" size="lg" src="https://i.pravatar.cc/150?u=a04258114e29026708c"/>
      <div className="ml-2">{props.username}</div>
    </div>
  );
};

export default UserProfile;