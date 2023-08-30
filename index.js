import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; 

const contractABI = require('../artifacts/contracts/SmartContract.sol/SimpleContract.json').abi;

const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

const App = () => {
  const [contract, setContract] = useState(null);
  const [name, setName] = useState('');
  const [names, setNames] = useState([]);
  const [deleteName, setDeleteName] = useState('');

  useEffect(() => {
    const contractInstance = new web3.eth.Contract(contractABI, contractAddress);
    setContract(contractInstance);
  }, []);

  const handleSetName = async () => {
    await contract.methods.setName(name).send({ from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' }); 
    setName('');
  };

  const handleGetNames = async () => {
    const names = await contract.methods.getAllNames().call();
    setNames(names);
  };  

  const handleResetNames = async () => {
    await contract.methods.reset().send({ from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266' }); 
    setNames([]);
  };

  const handleDeleteName = async () => {
    await contract.methods.deleteName(deleteName).send({ from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266' });
    setDeleteName(''); 
    handleGetNames(); 
  };

  return (
    <div style={{ backgroundColor: 'magenta', padding: '200px', borderRadius: '50px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
    <h1>My Ethereum dApp</h1>
    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
    <button onClick={handleSetName}>Suggest Me A Name </button><br /><br />
    <input type="text" value={deleteName} onChange={(e) => setDeleteName(e.target.value)} />
    <button onClick={handleDeleteName}>Delete</button><br /><br />
    <button onClick={handleGetNames}>All Suggestions</button>
    <button onClick={handleResetNames}>Delete All </button>
    <ul>
      {names.map((name, index) => (
        <li key={index}>{name}</li>
      ))}
    </ul>
  </div>
  
  );
};

export default App;
