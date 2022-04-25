import { Actions, User } from './actions'

type InitialState = {
  isAuthenticated: boolean
  user: User | null
}

const initialState: InitialState = {
  isAuthenticated: false,
  user: null,
}

const authReducer = (state = initialState, actions: Actions) => {
  switch (actions.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: actions.payload,
      }

    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      }

    default:
      return state
  }
}

export default authReducer
