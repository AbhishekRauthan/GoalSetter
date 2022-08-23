import { Box, Button, Icon } from '@chakra-ui/react';
import Link from 'next/link';
import { IconType } from 'react-icons/lib';

type HeadLinkProps = {
  href: string;
  icon: IconType;
  btnTxt: string;
};

const HeadLink = ({ btnTxt, href, icon }: HeadLinkProps) => {
  return (
    <Box as="li">
      <Link href={href}>
        <Button
          variant="link"
          leftIcon={<Icon as={icon} />}
          color="black"
          textTransform="capitalize"
          size="xs"
          fontWeight="medium"
        >
          {btnTxt}
        </Button>
      </Link>
    </Box>
  );
};

export default HeadLink;
