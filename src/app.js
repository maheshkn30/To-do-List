import { useState } from "react";
import "./app.css";

export default function App() {
  return (
    <div className="todo-container">
      <Header />
      <Main />
    </div>
  );
}

function Header() {
  return (
    <header
      style={{
        backgroundColor: "lightblue",
        padding: "1rem",
        textAlign: "center",
        marginBottom: "24px",
        borderRadius: "10px",
      }}
    >
      <h1>To-Do List</h1>
    </header>
  );
}

function Main() {
  const [item, setItem] = useState("");
  const [date, setDate] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [filter, showFilter] = useState(true);
  const [editValue, setEditValue] = useState("");
  const [editId, setEditId] = useState(null);

  function handleAddItems() {
    const payload = { id: crypto.randomUUID(), name: item, status: "new" };
    setDate([...date, payload]);
    console.log([...date, payload]);
    setItem("");
  }

  function handleSearch() {
    setItem("");
    const find = date.filter((val) =>
      val?.name.toLowerCase().includes(item.toLocaleLowerCase()),
    );
    setFilterData(find);
    showFilter(false);
  }

  function handleClear() {
    showFilter(true);
    setItem("");
  }

  function handleEdit(val) {
    setEditId(val?.id);
    setEditValue(val?.name);
  }

  function handleUpdate(val) {
    const id = val?.id;
    const updatedData = date.map((val) =>
      val?.id === id ? { ...val, name: editValue } : val,
    );
    console.log(updatedData);
    setDate(updatedData);
    setEditId(null);
    setEditValue("");
  }

  function handleRemoved(val) {
    const id = val?.id;
    const removed = date.filter((val) => val?.id !== id);
    setDate(removed);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Please Enter the task"
        required
        value={item}
        onChange={(e) => setItem(e.target.value)}
        className="todo-input"
      />
      <button onClick={handleAddItems} disabled={!item} className="btn add-btn">
        Add
      </button>
      <button onClick={handleSearch} className="btn search-btn">
        Search
      </button>
      <button onClick={handleClear} className="btn clear-btn">
        Clear all
      </button>

      <p className="list-title">
        {date.length > 0 ? "The List" : "Please Add the task"}
      </p>
      {filter && (
        <ol>
          {date.map((val) => {
            return (
              <>
                <li key={val?.id} className="todo-item">
                  Name : {val?.name} - Status: {val?.status}
                </li>

                <button
                  onClick={() => handleEdit(val)}
                  className="btn edit-btn"
                >
                  Edit
                </button>
                {editId === val?.id && (
                  <input
                    type="text"
                    placeholder="Please Enter the task"
                    required
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="edit-input"
                  />
                )}
                {editId === val?.id && (
                  <button
                    onClick={() => handleUpdate(val)}
                    className="btn update-btn"
                  >
                    update
                  </button>
                )}
                <button
                  onClick={() => handleRemoved(val)}
                  className="btn delete-btn"
                >
                  Delete
                </button>
              </>
            );
          })}
        </ol>
      )}

      {/* Filter Data */}
      {!filter && (
        <ol>
          {filterData.map((val) => {
            return (
              <>
                <li key={val?.id} className="todo-item">
                  Name : {val?.name} - Status: {val?.status}
                </li>
              </>
            );
          })}
        </ol>
      )}
    </div>
  );
}
