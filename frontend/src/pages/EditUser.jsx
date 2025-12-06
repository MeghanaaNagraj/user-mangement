import { useEffect, useState } from "react";
import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";
import { toast } from "react-toastify";


export default function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [user, setUser] = useState({ name: "", email: "", password: "" });

  async function loadUser() {
    if (!isEditing) return;
    const res = await API.get("/users");
    const data = res.data.find((u) => u._id === id);
    setUser(data);
  }

  useEffect(() => {
    (()=>{
     loadUser()
    })()
  }, []);

 async function handleSubmit() {
  try {
    if (isEditing) {
      await API.put(`/users/${id}`, user);
      toast.success("User updated successfully ");
    } else {
      await API.post("/register", user);
      toast.success("User created successfully ");
    }

    setTimeout(() => navigate("/users"), 1200);

  } catch {
    toast.error("Something went wrong ");
  }
}

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 80 }}>
      <Card sx={{ width: 400 }}>
        <CardContent>
          <Typography variant="h5" mb={2}>
            {isEditing ? "Edit User" : "Create User"}
          </Typography>

          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            margin="normal"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />

          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />

          {!isEditing && (
            <TextField
              fullWidth
              type="password"
              label="Password"
              variant="outlined"
              margin="normal"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          )}

          <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={handleSubmit}>
            Save
          </Button>

          <Button fullWidth variant="text" sx={{ mt: 1 }} onClick={() => navigate("/users")}>
            Cancel
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
