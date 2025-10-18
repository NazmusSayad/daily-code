import { createContext } from '@/react'
import * as React from 'react'

export const [AuthProvider, useAuth, ctx] = createContext(
  () => {
    const [name, setName] = React.useState('John')
    const [age, setAge] = React.useState(30)

    return { name, age, setName, setAge }
  },
  {
    useContext: (context) => {
      if (context === undefined) {
        throw new Error(`Auth: Used outside of its provider`)
      }

      return {
        ...context,
        name: 'Tet',
      }
    },

    useProvider(children, props) {
      return <div>Hello {props.name}</div>
    },
  }
)

export function useGetAuth() {
  const { name, age } = useAuth()
  return { name, age }
}

export function App({}) {
  const { name, age } = useAuth()

  return (
    <div>
      app {name} {age}
    </div>
  )
}
