import { Box, VStack } from '@chakra-ui/react';
import { useRef } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { PrimaryBtn } from '../components/Button';
import { PrimaryHeading, SecondaryHeading } from '../components/Heading';
import { Input, PasswordInput } from '../components/Input';
import axios from 'axios';
import { FormCon } from '../components/Container';

const Login = () => {
  const emailRef = useRef<HTMLInputElement>();
  const pwrdRef = useRef<HTMLInputElement>();

  async function onSubmit() {
    const email = emailRef.current.value;
    const password = pwrdRef.current.value;

    const response = await axios.post('/api/users/login', {
      email,
      password,
    });
    localStorage.setItem('user_token', JSON.stringify(response.data));

    const user = localStorage.getItem('user_token');
    console.log(JSON.parse(user));
    
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
        <FormCon>
          <Input type="email" ref={emailRef}>
            email
          </Input>
          <PasswordInput ref={pwrdRef}>password</PasswordInput>
          <PrimaryBtn onClick={onSubmit}>Login</PrimaryBtn>
        </FormCon>
      </VStack>
    </>
  );
};

export default Login;
