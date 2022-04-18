import React, { useRef } from 'react';
import './styles.css';

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent<HTMLFormElement>) => void;
}
const InputField = ({ todo, setTodo, handleAdd }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    handleAdd(e);
    inputRef.current?.blur();
  };
  return (
    <form className='input' onSubmit={submitHandler}>
      <input
        ref={inputRef}
        type='input'
        className='input__box'
        placeholder='Enter a task'
        value={todo}
        onChange={onChangeHandler}
      />
      <button className='input_submit' type='submit'>
        Go
      </button>
    </form>
  );
};

export default InputField;
