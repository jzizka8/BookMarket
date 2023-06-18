import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../services/authApi';

type UseLoginProps = {
  redirect: string;
};

const useLogin = ({ redirect }: UseLoginProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutateAsync: loginn,
    isLoading,
    isError,
  } = useMutation<unknown, unknown, { username: string; password: string }>({
    mutationFn: (variables) => login(variables.username, variables.password),
    retry: false,
    onSuccess: () => {
      navigate(redirect);
      queryClient.invalidateQueries(['auth']);
    },
  });

  return { login: loginn, isLoading, isError };
};

export default useLogin;
