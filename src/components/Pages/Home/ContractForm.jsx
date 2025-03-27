import { useEffect, useState } from "react";
import axios from "axios";
import Pop from "../../Common/Pop";
const ContractForm = ({ selectedContract, setSelectedContract, fetchContracts }) => {
  const [clientName, setClientName] = useState(selectedContract?.client_name || "");
  const [contractId, setContractId] = useState(selectedContract?.contract_id || "");
  const [status, setStatus] = useState(selectedContract?.status || "canceled");
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (selectedContract) {
      setClientName(selectedContract.client_name);
      setContractId(selectedContract.contract_id);
      setStatus(selectedContract.status);
    }else{
      setClientName("");
      setContractId("");
      setStatus("canceled");
    }
  }, [selectedContract]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { client_name: clientName, contract_id: contractId, status };

    try {
      if (selectedContract) {
        setIsOpen(true);
        setMessage("Contract updated successfully");
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/contracts/${selectedContract.id}`, payload).then(() => {
          setMessage("Contract updated successfully");
          
        });
      } else {
        setIsOpen(true);
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/contracts`, payload).then(() => {
          setMessage("Contract saved successfully");
        });
      }
      fetchContracts();
    } catch (error) {
      console.error("Error saving contract:", error);
    }
  };

  return (
    <>
      <Pop isOpen={isOpen} onClose={setIsOpen} message={message}/>
      <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold ">
            {selectedContract ? "Edit Contract" : "Add Contract"}
          </h3>
          <button onClick={() => setSelectedContract(null)} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">ADD Contract</button>

          </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <input
          type="text"
          placeholder="Client Name"
          name="client_name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Contract ID"
          name="contract_id"
          value={contractId}
          onChange={(e) => setContractId(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <select
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 w-full"
          required
        >
          <option value="canceled">Canceled</option>
          <option value="finalized">Finalized</option>
          <option value="pending">Pending</option>
        </select>
        <div className="flex justify-end space-x-2">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {selectedContract ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </>
  );
};

export default ContractForm;