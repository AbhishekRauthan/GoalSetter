import { Box, Text, Tooltip, useToast } from '@chakra-ui/react';
import axios from 'axios';
import Router from 'next/router';
import { useRef, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { PrimaryBtn } from '../components/Button';
import { CenterCon, FormCon } from '../components/Container';
import { PrimaryHeading, SecondaryHeading } from '../components/Heading';
import { Input, PasswordInput } from '../components/Input';
import { useAuthStore } from '../feature/store';

const Register = () => {
  const [isEqualPass, setIsEqualPass] = useState(false);
  const nameRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const passRef = useRef<HTMLInputElement>();
  const conPassRef = useRef<HTMLInputElement>();
  const toast = useToast();
  const { setUser } = useAuthStore();
  const checkPasswords = () => {
    if (passRef.current.value === conPassRef.current.value) {
      setIsEqualPass(true);
    } else {
      setIsEqualPass(false);
    }
  };
  const onSubmit = async () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passRef.current.value;

    await axios
      .post('/api/users', {
        email,
        name,
        password,
      })
      .then((response) => {
        setUser(response.data);
        Router.push('/');
      })
      .catch((err) => {
        console.log(err);

        toast({
          position: 'top',
          status: 'error',
          isClosable: true,
          title: err.response.data.error,
        });
      });
  };
  return (
    <>
      <CenterCon>
        <Box>
          <PrimaryHeading icon={FaUser}>Register</PrimaryHeading>
          <SecondaryHeading>Please create an account</SecondaryHeading>
        </Box>
        <FormCon>
          <Input type="text" ref={nameRef} width="sm">
            Name
          </Input>
          <Input type="email" ref={emailRef} width="sm">
            Email
          </Input>
          <Text fontSize="sm" display={{ base: 'inline-block', lg: 'none' }}>
            Passowrd should be 8 character length with numbers and symbols
          </Text>
          <Tooltip label="Passowrd should be 8 character length with numbers and symbols">
            <PasswordInput ref={passRef} onChange={checkPasswords}>
              password
            </PasswordInput>
          </Tooltip>
          <PasswordInput
            ref={conPassRef}
            onChange={checkPasswords}
            focusBorderColor={isEqualPass ? 'green.500' : 'red.500'}
            borderColor={isEqualPass ? 'green.500' : 'red.500'}
          >
            confirm password
          </PasswordInput>
          <PrimaryBtn onClick={onSubmit}>Register</PrimaryBtn>
        </FormCon>
      </CenterCon>
    </>
  );
};

export default Register;
