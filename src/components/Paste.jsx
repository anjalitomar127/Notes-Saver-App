// // File: Paste.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";

import { toast } from "react-hot-toast";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div>
      <div>
        <input
          type="search"
          placeholder="Search pastes..."
          className="m-4 p-2 border border-gray-300 rounded text-black w-[500px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div>
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div
                key={paste._id}
                className="border border-gray-300 rounded m-4 w-[800px] p-4"
              >
                <div>{paste.title}</div>
                <div>{paste.value.substring(0, 100)}...</div>

                <div className="flex flex-row mt-4 gap-5 justify-end">
                  <button>
                    <a href={`/?pasteId=${paste?._id}`}
                    >
                      Edit{" "}
                    </a>
                  </button>

                  <button>
                    <a href={`/pastes/${paste._id}`}>View </a>
                  </button>

                  <button onClick={() => handleDelete(paste?._id)}>
                    Delete
                  </button>

                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: paste.title,
                          text: paste.value,
                        });
                      } else {
                        navigator.clipboard.writeText(paste.value);
                        toast.success("Copied to Clipboard");
                      }
                    }}
                    className="flex items-center gap-2"
                  >
                    Share
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.value);
                      toast.success("Content Copied");
                    }}
                  >
                    Copy
                  </button>
                </div>

                <div>{paste.createdOn}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
