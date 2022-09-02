import { Box, useToast } from '@chakra-ui/react';
import { useRef } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { PrimaryBtn } from '../components/Button';
import { PrimaryHeading, SecondaryHeading } from '../components/Heading';
import { Input, PasswordInput } from '../components/Input';
import axios from 'axios';
import router from 'next/router';
import { CenterCon, FormCon } from '../components/Container';
import { useAuthStore } from '../feature/store';
import isUserShown from '../hooks/isUserShown';

const Login = () => {
  const { isUser } = isUserShown();
  const emailRef = useRef<HTMLInputElement>();
  const pwrdRef = useRef<HTMLInputElement>();
  const { setUser } = useAuthStore();
  const toast = useToast();
  async function onSubmit() {
    const email = emailRef.current.value;
    const password = pwrdRef.current.value;

    try {
      const response = await axios.post('/api/users/login', {
        email,
        password,
      });
      setUser(response.data);
      router.push('/');
    } catch (error) {
      toast({
        position: 'bottom',
        status: 'error',
        isClosable: true,
        title: 'Error! Unable to Login',
      });
    }
  }

  return (
    <CenterCon>
      {isUser ? (
        <>
          <PrimaryHeading>Already logged in as a user</PrimaryHeading>
        </>
      ) : (
        <>
          <Box>
            <PrimaryHeading icon={FaSignInAlt}>login</PrimaryHeading>
            <SecondaryHeading>Login and start setting goals</SecondaryHeading>
          </Box>
          <FormCon>
            <Input type="email" ref={emailRef}>
              email
            </Input>
            <PasswordInput ref={pwrdRef}>password</PasswordInput>
            <PrimaryBtn onClick={onSubmit}>Login</PrimaryBtn>
          </FormCon>
        </>
      )}
    </CenterCon>
  );
};

export default Login;
