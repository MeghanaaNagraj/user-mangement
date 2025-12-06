import { useState } from "react";
import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { toast } from "react-toastify";


export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
     const { data } = await API.post("/login", { email, password });
    localStorage.setItem("token", data.token);

    toast.success("Login successful");
    setTimeout(() => navigate("/users"), 1200);
    } catch {
      toast.error("Invalid credentials");
    }
  }

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card sx={{ width: 350, padding: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>

          <TextField 
            fullWidth 
            label="Email" 
            margin="normal" 
            variant="filled"
            onChange={(e) => setEmail(e.target.value)} 
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            variant="filled"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleLogin}>
            Login
          </Button>

          <Button
            fullWidth
            variant="text"
            sx={{ mt: 1 }}
            onClick={() => navigate("/register")}
          >
            Create Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
