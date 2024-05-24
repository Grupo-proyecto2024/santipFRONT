import { useState } from 'react';

export function useEliminarUsuario() {
  const [status, setStatus] = useState('idle');

  const eliminarUsuario = async (id) => {
    setStatus('loading');

    try {
      const response = await fetch(`http://localhost:4000/api/usuarios/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setStatus('succeeded');
    } catch (error) {
      console.error('Error:', error);
      setStatus('failed');
    }
  };

  return { status, eliminarUsuario };
}