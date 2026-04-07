import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";

function App() {
  const [pumps, setPumps] = useState([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");

  // ডেটা পড়া
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "pumps"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPumps(data);
    };
    fetchData();
  }, []);

  // নতুন ডেটা যোগ করা
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "pumps"), {
      name,
      status,
      location,
    });
    alert("New pump added!");
    setName("");
    setStatus("");
    setLocation("");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        ⛽ Fuel Pumps
      </h1>

      {/* Add Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 space-y-4 border p-4 rounded shadow bg-white"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Pump Name"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          placeholder="Status (Available/Not Available)"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add Pump
        </button>
      </form>

      {/* Pump List */}
      <ul className="space-y-3">
        {pumps.map((pump) => (
          <li
            key={pump.id}
            className="p-4 border rounded shadow bg-white flex justify-between items-center"
          >
            <span className="font-semibold">{pump.name}</span>
            <span
              className={
                pump.status === "Available"
                  ? "text-green-600 font-medium"
                  : "text-red-600 font-medium"
              }
            >
              {pump.status}
            </span>
            <span className="italic text-gray-500">{pump.location}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
