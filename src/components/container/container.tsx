import SubmitList from '../submitList/submitList';
import TopBar from '../topBar/topBar';
import './container.css';

type Props = {
  onOpenControlled: () => void;
  onOpenUncontrolled: () => void;
};

const Container = ({ onOpenControlled, onOpenUncontrolled }: Props) => {
  return (
    <div className='container'>
      <div className='header'>
        <TopBar
          onOpenControlled={onOpenControlled}
          onOpenUncontrolled={onOpenUncontrolled}
        />
      </div>

      <div className='list'>
        <SubmitList />
      </div>
    </div>
  );
};

export default Container;