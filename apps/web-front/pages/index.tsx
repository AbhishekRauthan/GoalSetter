import { Box, Spinner, useToast, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { PrimaryBtn } from '../components/Button';
import { CenterCon, FormCon } from '../components/Container';
import { PrimaryHeading, SecondaryHeading } from '../components/Heading';
import { Input } from '../components/Input';
import { useAuthStore, useGoalState } from '../feature/store';

function HomePage() {
  const { user } = useAuthStore();
  const { setAllGoals, goals, addGoal } = useGoalState();
  const toast = useToast();
  useEffect(() => {
    (async function () {
      console.log('in useEffect start');

      if (user) {
        if (!localStorage.getItem('state')) {
          await axios
            .get('/api/goals', {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            })
            .then((response) => {
              setAllGoals(response.data);
              console.log(response.data);
            })
            .catch(() =>
              toast({
                position: 'top',
                description: 'Error! Cannot get Goals',
                status: 'error',
                isClosable: true,
              })
            );
        } else {
          const state = JSON.parse(localStorage.getItem('state'));
          setAllGoals(state.goal);
        }
      }
    })();
  }, []);
  const goalRef = useRef<HTMLInputElement>();
  async function addGoalHandler() {
    const text = goalRef.current.value;
    // addGoal()
  }

  return (
    <CenterCon>
      {user ? (
        <>
          <FormCon>
            <PrimaryHeading>Welcome {user.name}</PrimaryHeading>
            <SecondaryHeading paddingBottom="2">
              goals dashboard
            </SecondaryHeading>
            <Input type="text" ref={goalRef}>
              Goal
            </Input>
            <PrimaryBtn onClick={addGoalHandler}>add goal</PrimaryBtn>
            <Box bgColor="black" padding="0.2px" w="full" />
          </FormCon>
          <VStack alignItems="center" justifyContent="center">
            {goals.length > 0 ? (
              goals.map((goal) => <p key={goal.id}>{goal.text}</p>)
            ) : (
              <p>No Goals</p>
            )}
          </VStack>
        </>
      ) : (
        <>
          <PrimaryHeading>Not Logged in</PrimaryHeading>
          <SecondaryHeading>Log in or register as new user</SecondaryHeading>
        </>
      )}
    </CenterCon>
  );
}

export default HomePage;
