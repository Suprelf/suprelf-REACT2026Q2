import SubmitList from '../submitList/submitList';
import TopBar from '../topBar/topBar';
import './container.css';

const Container = () => {
  return (
    <div className='container'>
      <div className='header'>
        <TopBar></TopBar>
      </div>

      <div className='list'>
        <SubmitList></SubmitList>
      </div>
    </div>
  );
};

export default Container;
