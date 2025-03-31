import { useState, Suspense, lazy } from "react";
const WebSocketStatus = lazy(() => import("./WebSocketStatus"));
const SearchFilter = lazy(() => import("./SearchFilter"));
const ContractForm = lazy(() => import("./ContractForm"));
const ContractList = lazy(() => import("./ContractList"));

const Home = () => {
  const [selectedContract, setSelectedContract] = useState(null);
  const [contracts, setContracts] = useState([]);
console.log(contracts);
  return (
    <div className="p-4 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">📄 Contract Management</h1>
      <Suspense fallback={<div>Loading status...</div>}>
        <WebSocketStatus />
      </Suspense>
      <Suspense fallback={<div>Loading search...</div>}>
        <SearchFilter setContracts={setContracts} />
      </Suspense>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <div>
          <Suspense fallback={<div>Loading form...</div>}>
            <ContractForm 
              selectedContract={selectedContract} 
              setSelectedContract={setSelectedContract} 
              fetchContracts={() => {}} 
            />
          </Suspense>
        </div>
        <div>
          <Suspense fallback={<div>Loading contracts...</div>}>
            <ContractList 
              setSelectedContract={setSelectedContract} 
              fillterContracts={contracts} 
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Home;
