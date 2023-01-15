import React from 'react'

interface Props {
    todo: string,
    setTodo: React.Dispatch<React.SetStateAction<string>>,
    handleAdd: (e: React.FormEvent) => void
}

const InputField: React.FC<Props> = ({todo, setTodo}) => {
  return (
    <form className='input'>
        <input type='input' placeholder='enter task' className='input__box'
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
         />
        <button className='input_submit' type='submit'>
            Go
        </button>
    </form>
  )
}

export default InputField