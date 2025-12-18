import React from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { updateToPastes } from "../redux/pasteSlice";
import { addToPastes } from "../redux/pasteSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams("");
  const [showDialog, setShowDialog] = useState(false);
  const pasteId = searchParams.get("pasteId");
  const allPastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);

      setTitle(paste.title);
      setValue(paste.value);
    }
  }, [pasteId, allPastes]);
  // Logic to handle paste creation or update
  // This function will be called when the button is clicked
  function createPaste() {
     if (!title.trim() || !value.trim()) {
    setShowDialog(true);
    return;
  }

    

    const paste = {
      // Logic to create a paste
      title: title,
      value: value,
      _id: pasteId || Date.now().toString(36),
      createdOn: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
      //if pasteId exists, update the paste
      //paste is sent to the slice as payload.
    } else {
      dispatch(addToPastes(paste)); //if pasteId does not exist, create a new paste
    }
    setTitle(""); // Reset title input
    setValue(""); // Reset value input
    setSearchParams(""); // Clear search params
  }
  return (

    <div className="container">


    {showDialog && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow-lg w-80">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">
            Validation Error
          </h2>

          <p className="text-gray-600 mb-4">
            Title and Notes cannot be empty.
          </p>

          <button
            type="button"
            onClick={() => setShowDialog(false)}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            OK
          </button>
        </div>
      </div>
    )}


      <div className="place-content-between flex flex-row gap-4 p-4">
        <input
          type="text"
          placeholder="Enter title here..."
          className="bg-gray-600 text-white border border-gray-600 p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          className="bg-blue-500 text-white p-2 rounded ml-2"
          onClick={createPaste} // Call createPaste function on click
          type="button"
        >
          {pasteId ? "Update Paste" : "Create Paste"}
        </button>
      </div>
      <div>
       

        <textarea
          placeholder="Enter your notes here..."
          className="bg-gray-600 text-white border border-gray-600 p-2 rounded w-full h-65 mt-4"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        ></textarea>
      </div>
    </div>

  )
  
}
export default Home;
