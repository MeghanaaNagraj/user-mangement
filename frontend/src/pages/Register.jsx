import { useState } from "react";
import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { toast } from "react-toastify";


export default function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  async function handleRegister() {
    try {
       await API.post("/register", user);
    toast.success("Account created successfully! 🎉");

    setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card sx={{ width: 350, padding: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Create Account
          </Typography>

          <TextField
            fullWidth
            label="Name"
            variant="filled"
            margin="normal"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />

          <TextField
            fullWidth
            label="Email"
            variant="filled"
            margin="normal"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />

          <TextField
            type="password"
            fullWidth
            label="Password"
            variant="filled"
            margin="normal"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleRegister}>
            Register
          </Button>

          <Button fullWidth variant="text" sx={{ mt: 1 }} onClick={() => navigate("/login")}>
            Back to Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
