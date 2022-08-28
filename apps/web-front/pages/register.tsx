import { Box, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { PrimaryBtn } from '../components/Button';
import { PrimaryHeading, SecondaryHeading } from '../components/Heading';
import { Input, PasswordInput } from '../components/Input';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  return (
    <>
      <VStack
        alignItems="center"
        justifyContent="center"
        paddingTop="16"
        spacing="5"
      >
        <Box>
          <PrimaryHeading icon={FaUser}>Register</PrimaryHeading>
          <SecondaryHeading>Please create an account</SecondaryHeading>
        </Box>
        <VStack as="form" paddingTop="7" spacing="8">
          <Input type="name">Name</Input>
          <Input type="email">Email</Input>
          <PasswordInput>password</PasswordInput>
          <PasswordInput>confirm password</PasswordInput>
          <PrimaryBtn>Register</PrimaryBtn>
        </VStack>
      </VStack>
    </>
  );
};

export default Register;
