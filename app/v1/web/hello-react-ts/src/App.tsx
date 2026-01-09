import { useEffect, useState } from "react";

type HelloResponse = {
  message: string;
};

export default function App() {
  const [data, setData] = useState<HelloResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/v1/hello", {
          method: "GET",
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status} ${res.statusText}`);
        }

        const json = (await res.json()) as HelloResponse;

        if (!json?.message) {
          throw new Error("Respuesta inválida: falta 'message'");
        }

        setData(json);
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
        setError(e instanceof Error ? e.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  return (
    <main style={{ fontFamily: "system-ui", padding: 24, maxWidth: 720 }}>
      <h1>Mi app web</h1>

      {loading && <p>Cargando...</p>}

      {!loading && error && (
        <div role="alert" style={{ padding: 12, border: "1px solid #999" }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {!loading && !error && data && (
        <div style={{ padding: 12, border: "1px solid #999" }}>
          <p>
            <strong>Mensaje:</strong> {data.message}
          </p>
        </div>
      )}
    </main>
  );
}
