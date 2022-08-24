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
import { FaUser } from 'react-icons/fa';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import { FormLabel } from '../pageStyles/register';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
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
            <Icon as={FaUser} marginRight="3" />
            register
          </Heading>
          <Text color="#828282" fontWeight="semibold" letterSpacing="wider">
            Please create a account
          </Text>
        </Box>
        <VStack as="form" paddingTop="7" spacing="5">
          <InputGroup position="relative">
            <Input
              _placeholder={{ opacity: 0 }}
              placeholder="Name"
              variant="flushed"
              size="sm"
              focusBorderColor="black"
              className="peer"
            />
            <FormLabel>Name</FormLabel>
          </InputGroup>
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
          <InputGroup position="relative">
            <Input
              _placeholder={{ opacity: 0 }}
              type={showPass2 ? 'text' : 'password'}
              placeholder="Name"
              variant="flushed"
              size="sm"
              focusBorderColor="black"
              className="peer"
            />
            <FormLabel>confirm password</FormLabel>
            <InputRightElement
              onClick={() => setShowPass2(!showPass2)}
              children={
                <Icon as={showPass2 ? FiEye : FiEyeOff} color="black" />
              }
            />
          </InputGroup>
        </VStack>
      </VStack>
    </>
  );
};

export default Register;
