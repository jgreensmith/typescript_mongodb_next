import { IUser } from '@/models/User'
import React from 'react'

interface Props {
    handleAddUser: (user: IUser) => Promise<void>
    jane: IUser
}

const AddJaneDoe: React.FC<Props> = ({handleAddUser, jane}) => {
  return (
    <div>
        <h6>add Jane Doe</h6>
    <button onClick={() => handleAddUser(jane)}>add</button>
    </div>
  )
}

export default AddJaneDoe