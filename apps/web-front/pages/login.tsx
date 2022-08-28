import { Box, VStack } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { PrimaryBtn } from '../components/Button';
import { PrimaryHeading, SecondaryHeading } from '../components/Heading';
import { Input, PasswordInput } from '../components/Input';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const emailRef = useRef<HTMLInputElement>();
  const pwrdRef = useRef<HTMLInputElement>();

  function onSubmit() {
    const email = emailRef.current.value;
    const password = pwrdRef.current.value;
    console.log({ email, password });
  }
  
  return (
    <>
      <VStack
        alignItems="center"
        justifyContent="center"
        paddingTop="16"
        spacing="5"
      >
        <Box>
          <PrimaryHeading icon={FaSignInAlt}>login</PrimaryHeading>
          <SecondaryHeading>Login and start setting goals</SecondaryHeading>
        </Box>
        <VStack as="form" paddingTop="7" spacing="8">
          <Input type="email" ref={emailRef}>email</Input>
          <PasswordInput ref={pwrdRef}>password</PasswordInput>
          <PrimaryBtn onClick={onSubmit}>Login</PrimaryBtn>
        </VStack>
      </VStack>
    </>
  );
};

export default Login;
