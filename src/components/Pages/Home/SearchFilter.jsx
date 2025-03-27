import { useState } from "react";
import axios from "axios";
const SearchFilter = ({ setContracts }) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/contracts?client_name=${search}&status=${status}`);
      setContracts(data);
    } catch (error) {
      console.error("Error searching contracts:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSearch} className="flex space-x-2 p-4 bg-white rounded-lg shadow-sm">
      <input
        type="text"
        placeholder="Search by Client Name or ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select 
        value={status} 
        onChange={(e) => setStatus(e.target.value)} 
        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All</option>
        <option value="canceled">Canceled</option>
        <option value="finalized">Finalized</option>
        <option value="pending">Pending</option>
      </select>
      <button 
        onClick={handleSearch} 
        className="bg-green-500 text-white p-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        disabled={isLoading}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

export default SearchFilter;