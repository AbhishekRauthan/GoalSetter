import { VStack } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const CenterCon = ({ children }: Props) => {
  return (
    <VStack
      alignItems="center"
      justifyContent="center"
      paddingTop="16"
      spacing="5"
    >
      {children}
    </VStack>
  );
};

export default CenterCon;
