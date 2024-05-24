import { useState } from 'react';

export function useCrearUsuario() {
  const [status, setStatus] = useState('idle');

  const crearUsuario = async (usuario) => {
    setStatus('loading');

    try {
      const response = await fetch('http://localhost:4000/api/usuarios/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
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

  return { status, crearUsuario };
}