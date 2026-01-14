import { useEffect, useState } from "react";
import { api, setToken, getToken, clearToken } from "./api";

export default function App() {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    setLogged(!!getToken());
  }, []);

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", fontFamily: "Arial" }}>
      <h2>React + Bearer Token</h2>
      {logged ? (
        <Hello onLogout={() => setLogged(false)} />
      ) : (
        <Login onLogin={() => setLogged(true)} />
      )}
    </div>
  );
}

function Login({ onLogin }: { onLogin: () => void }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.login(user, pass);
      setToken(res.token);
      onLogin();
    } catch (e: any) {
      setError(e.message || "Error de login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 8 }}>
      <input
        placeholder="Usuario"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        required
      />

      <input
        placeholder="Password"
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        required
      />

      <button disabled={loading}>
        {loading ? "Ingresando..." : "Login"}
      </button>

      {error && <span style={{ color: "red" }}>{error}</span>}
    </form>
  );
}

function Hello({ onLogout }: { onLogout: () => void }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const res = await api.hello();
      setMessage(res.message);
    } catch (e: any) {
      if (e.status === 401) {
        clearToken();
        onLogout();
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <p>{loading ? "Cargando..." : message}</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
