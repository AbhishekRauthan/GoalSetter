import { Box, Tooltip, useToast } from '@chakra-ui/react';
import axios from 'axios';
import Router from 'next/router';
import { useRef, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { PrimaryBtn } from '../components/Button';
import { CenterCon, FormCon } from '../components/Container';
import { PrimaryHeading, SecondaryHeading } from '../components/Heading';
import { Input, PasswordInput } from '../components/Input';
import { useAuthStore } from '../feature/store';
import isUserShown from '../hooks/isUserShown';

const Register = () => {
  const [isEqualPass, setIsEqualPass] = useState(false);
  const { isUser } = isUserShown();
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
    const conPass = conPassRef.current.value;
    if (!(email && name && password && conPass)) {
      console.log({ email, password, name, conPass });

      return toast({
        position: 'top',
        status: 'error',
        isClosable: true,
        title: 'Error! Please fill all fields in the form',
      });
    } else if (
      !password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]$/)
    ) {
      return toast({
        position: 'top',
        status: 'error',
        isClosable: true,
        title: 'Error! Not a strong password',
      });
    } else if (password !== conPass) {
      return toast({
        position: 'top',
        status: 'error',
        isClosable: true,
        title: 'Error! Passwords do not match',
      });
    } else {
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
          toast({
            position: 'top',
            status: 'error',
            isClosable: true,
            title: err.response.data.error,
          });
        });
    }
  };
  return (
    <>
      <CenterCon>
        {isUser ? (
          <>
            <PrimaryHeading>Already logged in as a user</PrimaryHeading>
          </>
        ) : (
          <>
            <Box>
              <PrimaryHeading icon={FaUser}>Register</PrimaryHeading>
              <SecondaryHeading>Please create an account</SecondaryHeading>
            </Box>
            <FormCon>
              <Input type="text" ref={nameRef}>
                Name
              </Input>
              <Input type="email" ref={emailRef}>
                Email
              </Input>
              <Tooltip label="Passowrd should be atleast 8 character length with numbers and symbols">
                <PasswordInput ref={passRef} onChange={checkPasswords}>
                  password
                </PasswordInput>
              </Tooltip>
              <PasswordInput
                ref={conPassRef}
                onChange={checkPasswords}
                focusBorderColor={isEqualPass ? 'green.500' : 'red.500'}
                borderColor={isEqualPass ? 'green.500' : 'red.500'}
                _focusVisible={{
                  boxShadow: 'none',
                  borderColor: isEqualPass ? 'green.500' : 'red.500',
                }}
                onKeyDownCapture={(e) => {
                  if (e.key === 'Enter') {
                    onSubmit();
                  }
                }}
              >
                confirm password
              </PasswordInput>
              <PrimaryBtn onClick={onSubmit}>Register</PrimaryBtn>
            </FormCon>
          </>
        )}
      </CenterCon>
    </>
  );
};

export default Register;
