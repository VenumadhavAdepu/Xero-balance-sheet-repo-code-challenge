import axios from "axios"
import { createContext, useContext, useReducer, useEffect, ReactNode } from "react"
import { BalanceSheetType} from '../model/balanceSheet.model'

const API_URL = 'http://localhost:4000/api/balance-sheet'

interface BalanceSheetState {
    balanceSheet: BalanceSheetType | null
}

const initialState: BalanceSheetState = {
    balanceSheet: null
}

type getSheetActions = 
    | { type: 'INITIAL_STATE' }
    | { type: 'GET_BALANCE_SHEET'; payload: BalanceSheetType }

interface BalanceSheetContextType { 
    state: BalanceSheetState;
    dispatch: React.Dispatch<getSheetActions>;
  }

export const BalanceSheetContext = createContext<BalanceSheetContextType | undefined>(undefined)

export const useBalanceSheetContext = () => useContext(BalanceSheetContext)

export const balanceSheetReducer = (state: BalanceSheetState, action: getSheetActions) => {
    switch(action.type) {
        case 'INITIAL_STATE':
            return state
        case 'GET_BALANCE_SHEET':
            return { ...state, balanceSheet: action.payload}
        default:
            throw new Error("unable to load Xero Balance sheet. Please try again later")
    }
}

export const useBalanceSheet = (): BalanceSheetContextType => {
    const context = useContext(BalanceSheetContext);
    if (context === undefined) {
      throw new Error('useBalanceSheet must be used within a BalanceSheetProvider');
    }
    return context;
  };


interface BalanceSheetProviderProps {
    children: ReactNode;
  }

export const BalanceSheetProvider: React.FC<BalanceSheetProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(balanceSheetReducer, initialState)

    useEffect(() => {
        const getData = async () => {
        const response = await axios.get(API_URL)
        const data = response.data[0] as BalanceSheetType
        dispatch({ type: 'GET_BALANCE_SHEET', payload: data})
        }
        getData()
    }, [])

    return (
        <BalanceSheetContext.Provider value={{ state, dispatch }}>
            {children}
        </BalanceSheetContext.Provider>
    )
}
