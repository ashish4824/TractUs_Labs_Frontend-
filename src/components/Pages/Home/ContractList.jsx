import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil } from "lucide-react";
import { Trash } from "lucide-react";
import { deleteContract, getContractList } from "../../../Services/api";
const ContractList = ({ setSelectedContract ,fillterContracts}) => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [deleting, setdeleting] = useState([]);
  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await getContractList(page, limit); 
        setContracts(response.data);
        setLoading(false);
        const totalItems = parseInt(response.headers?.['x-total-count'] || 0);
        setTotalPages(Math.ceil(totalItems / limit));
      } catch (err) {
        console.error('Error fetching contracts:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchContracts();
  }, [page, limit,deleting]);
  useEffect(() => {
    setContracts(fillterContracts);
  }, [fillterContracts]);
  const handleDelete = async (id) => {
    try {
    const response= await deleteContract(id);
    setdeleting(response.data);
    } catch (error) {
      console.error('Error deleting contract:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-5">Uploaded Contracts</h2>
      <ul className="space-y-2">
        {Array.isArray(contracts) && contracts.map((contract) => (
          <li key={contract.id} className="border p-2 flex justify-between">
            <div className="flex flex-col items-center">
              <span className="text-center font-medium text-lg text-red-500 ">
                {contract.client_name.toUpperCase()}
              </span>
              <p className="ml-2 text-gray-500 line-clamp-1">
              (<b>Contract:</b>{contract.contract_id})
              </p>
              <span className={`ml-2 capitalize ${contract.status === 'finalized' ? 'text-green-500' :contract.status === 'pending' ? 'text-yellow-500' :contract.status === 'canceled' ? 'text-red-500' : 'text-gray-500' }`}>
              {contract.status}
              </span>
            </div>
            {loading && <div className="text-center">Loading...</div>}
            <div className="flex space-x-2">
            <button 
              className="bg-green-500 hover:bg-green-600 h-fit text-white px-2 py-1 rounded"
              onClick={() => setSelectedContract(contract)}
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button 
              className="bg-red-700 hover:bg-red-800 h-fit text-white px-2 py-1 rounded"
              onClick={() => handleDelete(contract.id)}
            >
              <Trash className="w-4 h-4" />
            </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 mx-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 mx-1 ${page === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded hover:bg-gray-300`}
          >
            {i + 1}
          </button>
        ))}
        
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 mx-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ContractList;