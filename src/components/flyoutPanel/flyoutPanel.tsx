import './flyoutPanel.css';

const FlyoutPanel = () => {
  const selected = [];

  //if (selected.length === 0) return null;

  return (
    <div className="flyout">
      Selected: {selected.length}

      <button className='search-button'>Unselect all</button>
      <button className='search-button'>Download CSV</button>
    </div>
  );
};

export default FlyoutPanel;