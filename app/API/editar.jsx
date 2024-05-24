import { useState } from 'react';

export function useEditarUsuario() {
  const [status, setStatus] = useState('idle');

  const editarUsuario = async (id, usuario) => {
    setStatus('loading');

    try {
      const response = await fetch(`http://localhost:4000/api/usuarios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
  console.log(usuarioEditado);

      }

      setStatus('succeeded');
    } catch (error) {
      console.error('Error:', error);
      setStatus('failed');
    }
  };

  return { status, editarUsuario };
}