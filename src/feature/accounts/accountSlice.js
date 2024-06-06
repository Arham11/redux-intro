import { createSlice } from "@reduxjs/toolkit";

//  a slice is considered to be one of a reducer of store
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialStateAccount,
  reducers: {
    // all the function reducer methods
    // no need of any switch cases and hence no need of the default case
    deposit(state, action) {
      // you can directly mutate the state here , redux toolkit then takes care of
      // immutating the state in background.
      state.balance = state.balance + action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance = state.balance - action.payload;
    },
    // here the action.payload has two value i.e amount and purpose of loan
    // if action = {type:"account/requestLoan", action:{amount, purpose}}
    // only action.amount would be obtained

    // hence we have to prepare the data using Prepare Function
    // the Prepare
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance = state.balance - state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

// the deposit function in the below case will return a function and this will
// let know the react that it a thunk and hence react will not dispatch the action
// directly on the store but will wait for the aync call to complete. Once the async
// call is completed then only the dispatch action appears

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  // the below return functiions act as a middleWare and is a thunk
  // since this is function is returned later it accepts dispact and state param
  return async function (dispach, getState) {
    // all the API call , logging data, timer, async operation are done here

    dispach({ type: "account/convertingCurrency" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;

    dispach({ type: "account/deposit", payload: converted });
  };
}

export default accountSlice.reducer;
