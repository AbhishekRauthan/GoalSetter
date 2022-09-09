import {
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  HStack,
  Icon,
  IconButton,
  useEditableControls,
} from '@chakra-ui/react';
import { Goal } from '@full-stack/types';
import { Input } from '../Input';
import { FiCheck, FiEdit2 } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import { RiDeleteBin2Fill } from 'react-icons/ri';

interface EditableGoalProps {
  goal: Goal;
  onEditFinish: () => void;
  onDelete: () => void;
}
const EditableGoal = ({ goal, onEditFinish,onDelete }: EditableGoalProps) => {
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
      justifyContent="center"
    >
      <HStack
        spacing={'6'}
        padding="2"
        display="flex"
        w="sm"
        justifyContent={'space-between'}
      >
        <EditablePreview />
        <Input w={'xs'} as={EditableInput} children={''} />
        <EditableControls />
      </HStack>
    </Editable>
  );
};

export default EditableGoal;
