import { useSelector } from "react-redux";

import CreateCustomer from "./feature/customers/CreateCustomer";
import Customer from "./feature/customers/Customer";
import AccountOperations from "./feature/accounts/AccountOperations";
import BalanceDisplay from "./feature/accounts/BalanceDisplay";

function App() {
  const fullName = useSelector((store) => store.customer.fullName);
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {fullName.length ? (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      ) : (
        <CreateCustomer />
      )}
    </div>
  );
}

export default App;
