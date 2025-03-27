import { useState } from "react";
import WebSocketStatus from "./WebSocketStatus";
import SearchFilter from "./SearchFilter";
import ContractForm from "./ContractForm";
import ContractList from "./ContractList";

const Home = () => {
  const [selectedContract, setSelectedContract] = useState(null);
  const [contracts, setContracts] = useState([]);

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">📄 Contract Management</h1>
      <WebSocketStatus />
      <SearchFilter setContracts={setContracts} />
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <div>
          <ContractForm selectedContract={selectedContract} setSelectedContract={setSelectedContract} fetchContracts={() => {}} />
        </div>
        <div>
          <ContractList setSelectedContract={setSelectedContract} fillterContracts={contracts} />
        </div>
      </div>
    </div>
  );
};

export default Home;
