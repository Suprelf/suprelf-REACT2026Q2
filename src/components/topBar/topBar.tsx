import './topBar.css';

type Props = {
  onOpenControlled: () => void;
  onOpenUncontrolled: () => void;
};

const TopBar = ({ onOpenControlled, onOpenUncontrolled }: Props) => {
  return (
    <div className='bar-wrapper'>
      <button className='bar-button' onClick={onOpenControlled}>
        Controlled Form
      </button>

      <button className='bar-button' onClick={onOpenUncontrolled}>
        Uncontrolled Form
      </button>
    </div>
  );
};

export default TopBar;  