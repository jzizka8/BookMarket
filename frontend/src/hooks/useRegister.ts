import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registration } from '../services/authApi';

type UseRegisterProps = {
  redirect: string;
};

const useRegister = ({ redirect }: UseRegisterProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutateAsync: registerr,
    isLoading,
    isError,
  } = useMutation<unknown, unknown, { username: string; password: string }>({
    mutationFn: (variables) =>
      registration(variables.username, variables.password),
    retry: false,
    onSuccess: () => {
      navigate(redirect);
      queryClient.invalidateQueries(['auth']);
    },
  });

  return { registration: registerr, isLoading, isError };
};

export default useRegister;
