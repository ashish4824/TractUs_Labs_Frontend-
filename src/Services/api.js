import axios from 'axios';

export async function searchContracts(search, status) {
    return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/contracts?client_name=${search}&status=${status}`);
}

export async function getContractList(page, limit) {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/contracts`, {
        params: {
          page,
          limit
        }
      });
    return response;
}
export async function ContractUpdate(searchContracts,payload) {
  return  await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/contracts/${searchContracts.id}`, payload)
}
export async function addContractDetails(payload) {
   return await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/contracts`, payload)
}

export async function deleteContract(id) {
    return await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/contracts/${id}`);
}