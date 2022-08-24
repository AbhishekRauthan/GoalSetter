import {
  Box,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import { PrimaryBtn } from '../components/Button';
import { FormLabel } from '../globalStyles';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPass, setShowPass] = useState(false);
  return (
    <>
      <VStack
        alignItems="center"
        justifyContent="center"
        paddingTop="16"
        spacing="5"
      >
        <Box>
          <Heading
            as="h1"
            display="flex"
            justifyContent="center"
            textTransform="capitalize"
          >
            <Icon as={FaSignInAlt} marginRight="3" />
            login
          </Heading>
          <Text color="#828282" fontWeight="semibold" letterSpacing="wider">
            Login and start setting goals
          </Text>
        </Box>
        <VStack as="form" paddingTop="7" spacing="5">
          <InputGroup position="relative">
            <Input
              _placeholder={{ opacity: 0 }}
              placeholder="Name"
              type="email"
              variant="flushed"
              size="sm"
              focusBorderColor="black"
              className="peer"
            />
            <FormLabel>email</FormLabel>
          </InputGroup>
          <InputGroup position="relative">
            <Input
              _placeholder={{ opacity: 0 }}
              type={showPass ? 'text' : 'password'}
              placeholder="Name"
              variant="flushed"
              size="sm"
              focusBorderColor="black"
              className="peer"
            />
            <FormLabel>password</FormLabel>
            <InputRightElement
              onClick={() => setShowPass(!showPass)}
              children={<Icon as={showPass ? FiEye : FiEyeOff} color="black" />}
            />
          </InputGroup>
          <PrimaryBtn>Login</PrimaryBtn>
        </VStack>
      </VStack>
    </>
  );
};

export default Login;
