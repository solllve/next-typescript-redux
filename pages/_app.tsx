import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import {createStore} from 'redux';


export const bugAdded = description => ({
  type: 'bugAdded',
  payload: {
      description
  }
})

export const bugRemoved = id => ({
  type: 'bugRemoved',
  payload: {
      //if key and value are same then we can use shorthand syntax
      id
  }
})

export const bugResolved = id => ({
  type: 'bugResolved',
  payload: {
      //if key and value are same then we can use shorthand syntax
      id
  }
})

let lastId = 0

function reducer(state = [], action){
  switch(action.type){
      case 'bugAdded':
          return [
              ...state,
              {
                  id: ++lastId,
                  description: action.payload.description,
                  resolved: false
              }
          ];
      case 'bugRemoved':
          return state.filter(bug => bug.id !== action.payload.id);
      case 'bugResolved':
          //update the bug with the id with updated resolved to true
          return state.map(bug => bug.id === action.payload.id ? {...bug, resolved: true} : bug);
      default:
          return state;
  }
}

const store = createStore(reducer);


function MyApp({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
