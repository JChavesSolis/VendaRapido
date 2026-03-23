import { environments } from '~data/constants/environment.constants';



const login = async (email: string, password: string) => {
  try {
    await new Promise(resolve => setTimeout(resolve as any, 1500));

    if (
      email === environments.defaultUser.email && 
      password === environments.defaultUser.password
    ) {
      return {
        status: 'success',
        user: environments.defaultUser,
        token: 'fake-jwt-token-vendarapido-2026'
      };
    } else {
      throw new Error('Credenciales incorrectas');
    }
  } catch (error: any) {
    console.error('Error en login demo:', error.message);
    return {
      status: 'error',
      message: error.message
    };
  }
};



export const authService = {
  login,
};