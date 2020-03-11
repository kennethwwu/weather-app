
import { createContext, useContext } from 'react';

const stateContext = createContext<any>(null)

const useMyState = () => useContext(stateContext)

export { stateContext as default, useMyState}