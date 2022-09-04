import {
  HeadingProps as ChakraHeadingProps,
  Heading,
  Icon,
} from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { IconType } from 'react-icons/lib';

interface HeadingProp extends ChakraHeadingProps {
  children: ReactNode;
  icon?: IconType;
}

export const PrimaryHeading: FC<HeadingProp> = ({
  children,
  icon,
  ...rest
}) => {
  return (
    <Heading
      as="h1"
      display="flex"
      justifyContent="center"
      textTransform="capitalize"
      fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
      textAlign="center"
      {...rest}
    >
      {icon ? <Icon as={icon} marginRight="3" /> : ''}
      {children}
    </Heading>
  );
};

export const SecondaryHeading: FC<HeadingProp> = ({ children, ...rest }) => {
  return (
    <Heading as="h2" color="#828282" fontWeight="semibold" {...rest}>
      {children}
    </Heading>
  );
};
