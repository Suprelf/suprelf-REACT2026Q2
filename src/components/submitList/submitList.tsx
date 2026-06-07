import './submitList.css';

const SubmitList = () => {
  return (
    <div className="table-container">
      <div className="table-item">
        <div className="item-name table-header">Name</div>
        <div className="item-desc table-header">Description</div>
      </div>
      <hr className="hr-header" />

      <div>
        <div className="table-item">
          <div className="item-name">
            name
          </div>
          <div className="item-desc"></div>
        </div>
        <hr className="hr-item" />
      </div>
    </div>
  );
};

export default SubmitList;
