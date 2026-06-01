import { useQueryClient } from '@tanstack/react-query';

type Props = {
  queryKey: readonly unknown[];
};

const RefreshButton = ({ queryKey }: Props) => {
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey });
  };

  return (
    <button className="refresh-button" onClick={handleRefresh}>
      ↻
    </button>
  );
};

export default RefreshButton;
