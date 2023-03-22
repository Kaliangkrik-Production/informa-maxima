"use client"
import { useState } from 'react';

// ^(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])(?:\/(?:3[0-2]|[12]?\d))?$ 


export default function IpCalc() {
  const [ipAddress, setIpAddress] = useState('');
  const [maxAddress, setMaxAddress] = useState('');
  const [minAddress, setMinAddress] = useState('');
  const [networkAddress, setNetworkAddress] = useState('');
  const [broadcastAddress, setBroadcastAddress] = useState('');

  const calculate = () => {
    const ipParts = ipAddress.split('.');
    if (ipParts.length !== 4) {
      alert('Invalid IP address format');
      return;
    }
  
    const decimalIp = ipParts.map(part => parseInt(part));
    const binaryIp = decimalIp.map(part => part.toString(2).padStart(8, '0'));
  
    // Calculate subnet mask based on IP class
    let subnetMask;
    if (decimalIp[0] < 128) {
      subnetMask = '255.0.0.0';
    } else if (decimalIp[0] < 192) {
      subnetMask = '255.255.0.0';
    } else if (decimalIp[0] < 224) {
      subnetMask = '255.255.255.0';
    } else {
      alert('Invalid IP address');
      return;
    }
  
    const binarySubnetMask = subnetMask.split('.').map(part => parseInt(part).toString(2).padStart(8, '0'));
  
    // Calculate network address
    const networkAddressBinary = binaryIp.map((part, i) => parseInt(part, 2) & parseInt(binarySubnetMask[i], 2));
    const networkAddress = networkAddressBinary.join('.');
  
    // Calculate broadcast address
    const broadcastAddressBinary = binaryIp.map((part, i) => parseInt(part, 2) | ~parseInt(binarySubnetMask[i], 2) & 0xff);
    const broadcastAddress = broadcastAddressBinary.join('.');
  
    // Calculate maximum and minimum address
    const maxAddressBinary = broadcastAddressBinary.map((part, i) => i === 3 ? part - 1 : part);
    const maxAddress = maxAddressBinary.map(part => parseInt(part).toString()).join('.');
    const minAddressBinary = networkAddressBinary.map((part, i) => i === 3 ? part + 1 : part);
    const minAddress = minAddressBinary.map(part => parseInt(part).toString()).join('.');
  
    // Update state with the results
    setMaxAddress(maxAddress);
    setMinAddress(minAddress);
    setNetworkAddress(networkAddress);
    setBroadcastAddress(broadcastAddress);
  }
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          IP Calculator
        </h1>
  
        <div className="mt-8">
          <input
            type="text"
            placeholder="Enter IP Address"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>
  
        <div className="mt-8">
          <button
            type="button"
            onClick={calculate}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Calculate
          </button>
        </div>
  
        <div className="mt-8 text-white">
          <h2 className="text-2xl font-bold">Results</h2>
          <p>Max Address: {maxAddress}</p>
          <p>Min Address: {minAddress}</p>
          <p>Network Address: {networkAddress}</p>
          <p>Broadcast Address: {broadcastAddress}</p>
        </div>
      </main>
    </div>
  );
}