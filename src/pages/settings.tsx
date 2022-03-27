import {
  Container,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  VStack,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import {
  changeDifficulty,
  changeQuestionAmount,
  changeQuestionType,
} from '../features/settings/settingsSlice';
import { resetQuestions } from '../features/questions/questionsSlice';

export default function Settings(): JSX.Element {
  const dispatch = useDispatch();
  const {
    type: defaultType,
    difficulty: defaultDifficulty,
    questionsAmount: defaultQuestionsAmount,
  } = useSelector((state: RootState) => state.settings);
  return (
    <Container maxW='container.xl' d='flex' py='10' justifyContent={'center'}>
      <VStack spacing={'10'} w='xl'>
        <Heading>Settings</Heading>
        <VStack w='full'>
          <FormControl>
            <FormLabel htmlFor='questionAmount'>Question Amount</FormLabel>
            <NumberInput
              id='questionAmount'
              defaultValue={defaultQuestionsAmount}
              variant={'filled'}
              min={5}
              max={50}
              onChange={(_, val) => {
                dispatch(changeQuestionAmount(val));
                dispatch(resetQuestions());
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='difficulty'>Difficulty</FormLabel>
            <Select
              id='difficulty'
              placeholder='Select difficulty'
              variant={'filled'}
              defaultValue={defaultDifficulty}
              onChange={e => {
                dispatch(
                  changeDifficulty(e.target.value as 'easy' | 'medium' | 'hard')
                );
                dispatch(resetQuestions());
              }}
            >
              <option value='easy'>easy</option>
              <option value='medium'>medium</option>
              <option value='hard'>hard</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='type'>Question Type</FormLabel>
            <Select
              id='type'
              variant={'filled'}
              placeholder='Select question type'
              defaultValue={defaultType}
              onChange={e => {
                dispatch(
                  changeQuestionType(e.target.value as 'boolean' | 'multiple')
                );
                dispatch(resetQuestions());
              }}
            >
              <option value='boolean'>boolean</option>
              <option value='multiple'>multiple</option>
            </Select>
          </FormControl>
        </VStack>
      </VStack>
    </Container>
  );
}
