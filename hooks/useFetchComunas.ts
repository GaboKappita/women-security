import { useState, useEffect } from "react";
import { obtenerComunas } from "../services/api/auth";

const useFetchComunas = () => {
  const [comunas, setComunas] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComunas = async () => {
      try {
        const data = await obtenerComunas();
        setComunas(data);
      } catch (err) {
        setError("Hubo un problema al obtener las comunas.");
      } finally {
        setLoading(false);
      }
    };

    fetchComunas();
  }, []);

  return { comunas, loading, error };
};

export default useFetchComunas;
