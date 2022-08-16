import React, { useReducer, createContext, useContext } from 'react';

const initialUser = {
	login: false,
	token: '',
};

// 구매에 필요한 상품 초기 정보
const initialProduct = {
  price : 0,
  id : 0,
  name : '',
  date : '',
};

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const PAYMENT = 'PAYMENT';
export const REFUND = 'REFUND';

function userReducer(state, action) {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				login: action.payload.login,
				token: action.payload.token,
			};
		case LOGOUT:
			return;

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}

function productReducer(state, action) {
	switch(action.type) {
		case PAYMENT:
			return{
				...state,
				price : action.payment_data.price,
        id : action.payment_data.id,
        name : action.payment_data.name,
        date : action.payment_data.date,
        // user : action.payment_data.user
			};

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
	};
}

const UserStateContext = createContext();
const UserDispatchContext = createContext();

const ProductStateContext = createContext();
const ProductDispatchContext = createContext();

export function UserProvider({ children }) {
	const [state, dispatch] = useReducer(userReducer, initialUser);
	return (
		<UserStateContext.Provider value={state}>
			<UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
		</UserStateContext.Provider>
	);
}

export function ProductProvider({children}) {
  const [state, dispatch] = useReducer(productReducer, initialProduct);
  return (
    <ProductStateContext.Provider value={state}>
      <ProductDispatchContext.Provider value={dispatch}>{children}</ProductDispatchContext.Provider>
    </ProductStateContext.Provider>
  );
}

export function useUserState() {
	return useContext(UserStateContext);
}

export function useUserDispatch() {
  console.log((' 왔다 ㅇㅇ'));
	return useContext(UserDispatchContext);
}

export function useProductState() {
	return useContext(ProductStateContext);
}

export function useProductDispatch() {
  console.log(('여기까지 왔다 ㅇㅇ'));
	return useContext(ProductDispatchContext);
}