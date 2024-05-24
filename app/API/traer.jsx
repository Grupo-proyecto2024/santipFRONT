import { useState, useEffect } from 'react';

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/usuarios/')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setUsuarios(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return usuarios;
}

