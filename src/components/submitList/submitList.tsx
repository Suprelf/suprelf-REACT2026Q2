import { useFormStore } from '../../store/useStore';
import './submitList.css';

const SubmitList = () => {
  const submissions = useFormStore((s) => s.submissions);
  const newSubmissionId = useFormStore((s) => s.newSubmissionId);

  if (submissions.length === 0) {
    return <div className="empty">No submissions yet</div>;
  }

  return (
    <div className="grid">
      {submissions.map((item) => (
        <div
          key={item.id}
          className={`card ${
            item.id === newSubmissionId ? 'card--new' : ''
          }`}
        >
          {item.imageBase64 && (
            <div className="card-image">
              <img src={item.imageBase64} alt="avatar" />
            </div>
          )}

          <div className="card-content">
            <div className="card-header">
              <h4>{item.name}</h4>
              <span>{item.email}</span>
            </div>

            <div className="card-body">
              <p>
                <b>Age:</b> {item.age}
              </p>
              <p>
                <b>Gender:</b> {item.gender}
              </p>
              <p>
                <b>Country:</b> {item.country}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubmitList;