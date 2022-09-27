import {
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Icon,
  IconButton,
  Stack,
  useEditableControls,
  useToast,
} from '@chakra-ui/react';
import { Goal } from '@full-stack/types';
import { Input } from '../Input';
import { FiCheck, FiEdit2 } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { useRef } from 'react';
import { useAuthStore, useGoalStore } from 'apps/web-front/feature/store';
import axios from 'axios';

interface EditableGoalProps {
  goal: Goal;
  onDelete: () => void;
}
const EditableGoal = ({ goal, onDelete }: EditableGoalProps) => {
  const inputRef = useRef<HTMLInputElement>();
  const toast = useToast();
  const { user } = useAuthStore();
  const { updateGoal } = useGoalStore();
  async function onEditFinish() {
    await axios
      .put(
        `/api/goals/${goal._id}`,
        { text: inputRef.current.value },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then(() => {
        toast({
          isClosable: true,
          position: 'top',
          description: 'Goal Updation Successfull',
          status: 'success',
        });
        updateGoal(goal);
      })
      .catch(() => {
        toast({
          position: 'top',
          description: 'Error! Unable to update Goal',
          status: 'error',
          isClosable: true,
        });
      });
  }
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <Flex justifyContent="flex-end">
        <IconButton
          variant={'unstyled'}
          icon={<Icon as={FiCheck} />}
          aria-label=""
          {...getSubmitButtonProps({
            onClick: onEditFinish,
          })}
        />
        <IconButton
          variant={'unstyled'}
          icon={<Icon as={AiOutlineClose} />}
          {...getCancelButtonProps()}
          aria-label=""
        />
      </Flex>
    ) : (
      <Flex justifyContent="flex-end">
        <IconButton
          variant={'unstyled'}
          icon={<Icon as={FiEdit2} />}
          size="sm"
          aria-label=""
          {...getEditButtonProps()}
        />
        <IconButton
          variant={'unstyled'}
          icon={<Icon as={RiDeleteBin2Fill} />}
          size="sm"
          aria-label=""
          onClick={onDelete}
        />
      </Flex>
    );
  }
  return (
    <Editable
      isPreviewFocusable={false}
      defaultValue={goal.text}
      display="flex"
      alignItems="center"
      width={{ base: '90vw', md: '70vw', lg: 'xl' }}
      justifyContent="center"
    >
      <Stack
        spacing={{ base: '1', md: '0' }}
        direction={{ base: 'column', md: 'row' }}
        shadow="lg"
        padding={{base:"2",lg:"3"}}
        display="flex"
        width={{ base: '60vw', lg: '100%' }}
        alignItems={'center'}
        paddingX={{ base: '10', lg: '0' }}
        justifyContent={'space-evenly'}
        marginX={{lg:"auto"}}
        border={'1px'}
        borderRadius="md"
      >
        <EditablePreview fontSize={{lg:"xl"}}/>
        <Input
          w={{ base: '55vw', md: 'xs' }}
          as={EditableInput}
          marginX="auto"
          ref={inputRef}
          onKeyDownCapture={(e) => {
            if (e.key === 'Enter') {
              onEditFinish();
            }
          }}
        >
          {''}
        </Input>
        <EditableControls />
      </Stack>
    </Editable>
  );
};

export default EditableGoal;
