import { VStack } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const CenterCon = ({ children }: Props) => {
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

export const FormCon = ({ children }: Props) => {
  return (
    <VStack as="form" paddingTop="7" spacing="8">
      {children}
    </VStack>
  );
};
