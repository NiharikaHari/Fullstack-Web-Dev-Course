const Filter = ({ filterWith, handleFilterChange }) => {
  return (
    <div>
      filter shown with{" "}
      <input value={filterWith} onChange={handleFilterChange}></input>
    </div>
  );
};

export default Filter;
