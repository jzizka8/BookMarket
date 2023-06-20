import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authApi';

type UseLogoutProps = {
  redirect: string;
};

const useLogout = ({ redirect }: UseLogoutProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutateAsync: logoutt,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      navigate(redirect);
      queryClient.resetQueries(['auth']);
    },
  });

  return { logout: logoutt, isLoading, isError };
};

export default useLogout;
