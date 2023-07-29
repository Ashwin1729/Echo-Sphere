import React from "react";
import { Badge } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const UserBadges = ({ user, handleFunction, admin }) => {
  return (
    <Badge
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorScheme="purple"
      cursor="pointer"
      color="white"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      {user.name}
      {admin === user._id && <span> (Admin)</span>}
      <CloseIcon pl={1} ml={2} onClick={handleFunction} />
    </Badge>
  );
};

export default UserBadges;
