import Link from 'next/link';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { FaSignInAlt, FaUser } from 'react-icons/fa';
import { HiMenuAlt3 } from 'react-icons/hi';
import { LogoContainer } from './styles';
import HeadLink from './HeadLink';

const Header = () => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      padding="2"
      maxWidth="1280px"
      marginX="auto"
      borderBottom="1px"
      borderStyle="solid"
      borderColor="#e6e6e6"
    >
      <LogoContainer textDecoration="none" color="black" letterSpacing="widest">
        <Link href="/">GoalSetter</Link>
      </LogoContainer>
      <HStack
        as="ul"
        spacing="4"
        display={{ base: 'none', md: 'flex' }}
        justifyContent="space-between"
        alignItems="center"
        listStyleType="none"
        color="black"
      >
        <HeadLink btnTxt="Login" href="/login" icon={FaSignInAlt} />
        <HeadLink btnTxt="Register" href="/register" icon={FaUser} />
      </HStack>
      <Box display={{ base: 'block', md: 'none' }}>
        <Menu isLazy>
          <MenuButton
            as={IconButton}
            icon={<HiMenuAlt3 />}
            aria-label="menu"
            variant="ghost"
          />
          <MenuList listStyleType="none" minW="max-content">
            <MenuItem width="max-content">
              <HeadLink btnTxt="Login" href="/login" icon={FaSignInAlt} />
            </MenuItem>
            <MenuItem>
              <HeadLink btnTxt="Register" href="/register" icon={FaUser} />
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default Header;
