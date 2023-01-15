
import AddJaneDoe from '@/components/addJaneDoe'
import InputField from '@/components/InputField'
import dbConnect from '@/lib/dbConnect'
import { Todo } from '@/models/models'
import User, { IUser } from '@/models/User'
import styles from '@/styles/Home.module.css'
import { GetServerSideProps } from 'next'
import React, { useState } from 'react'


// interface Person {
//   name: string,
//   age: number
// }
// interface User extends Person {
//   id: string
// }
interface Props {
  users?: IUser[],
  butt?: number
}

const Home: React.FC<Props> = ({users, butt}) => {
  // let people: Person[] 
  // people = [{name: 'bob', age: 42}, {name: 'bill', age: 32}]
  // let user : User 
  // user = {id: 'butt555', name: 'micheal scott', age: 46}
  // console.log({people, user})

  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([]);
  const john = {
    name: 'John Doe',
    age: 32
  }
  const jane = {
    name: 'Jane Doe',
    age: 37
  }


  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const handleAddUser = async (user: IUser) => {
    
    const res = await fetch('/api/add-user', {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({user})
    })

    const data = await res.json()
    if(data.error) {
      console.log({e: data.error})
    } else {
      console.log({data})
    }
  }
console.log({users, butt})

  return (
    <div className={styles.App}>
      <span className={styles.heading}>Taskify</span>
      
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
      <button onClick={() => handleAddUser(john)}>
        add John Doe
      </button>
      <AddJaneDoe handleAddUser={handleAddUser} jane={jane}  />
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    await dbConnect()

    const arr = await User.find()

    if(!arr) return {notFound: true}

    const users: IUser[] = JSON.parse(JSON.stringify(arr))
   
    return {
      props: {
        users,
        butt: 5
      }
    }
  
}
