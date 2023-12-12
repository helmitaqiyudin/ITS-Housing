import { Flex } from "@chakra-ui/react";
import {
  type ReactNode
} from "react";

const PageRow = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Flex className="page__row" mb="80px">
        {children}
      </Flex>
    </>
  );
};

export default PageRow;
