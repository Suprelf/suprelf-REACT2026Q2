import { getPasswordStrength } from '../../services/passwordStrength';
import './passwordIndicator.css';

type Props = {
  value: string;
};

export const PasswordIndicator = ({ value }: Props) => {
  const strength = getPasswordStrength(value);

  return (
    <div className="strength">
      <div className="strength-bar">
        <div
          className={`strength-fill ${strength.label.toLowerCase().replace(' ', '-')}`}
          style={{ width: `${(strength.score / 5) * 100}%` }}
        />
      </div>
    </div>
  );
};
