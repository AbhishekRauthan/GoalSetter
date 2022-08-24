import { ButtonProps } from '@chakra-ui/react';
import { ReactNode, FC } from 'react';
import { PryBtnHov } from './styles';

interface BtnProps extends ButtonProps {
  children: ReactNode;
}

export const PrimaryBtn: FC<BtnProps> = ({ children, ...rest }) => (
  <PryBtnHov
    variant="solid"
    bgColor="black"
    color="white"
    textTransform="capitalize"
    {...rest}
  >
    {children}
  </PryBtnHov>
);
