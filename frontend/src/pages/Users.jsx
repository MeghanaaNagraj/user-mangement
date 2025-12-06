import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import {
  Button,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Avatar,
  TextField,
  TablePagination
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

export default function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  async function loadUsers() {
    try {
      const { data } = await API.get("/users");
      setUsers(data);
    } catch {
      toast.error("Failed to load users ❌");
    }
  }

  async function deleteUser(id) {
    try {
      await API.delete(`/users/${id}`);
      toast.success("User deleted successfully 🗑");
      loadUsers();
    } catch {
      toast.error("Error deleting user ❌");
    }
  }

  function logout() {
    localStorage.removeItem("token");
    toast.info("Logged out 👋");
    setTimeout(() => navigate("/login"), 1000);
  }

  useEffect(() => {
    (()=>{
        loadUsers()
    })()
  }, []);

  // Search logic
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchInput.toLowerCase()) ||
    u.email.toLowerCase().includes(searchInput.toLowerCase())
  );

  // Pagination slice
  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>

      <Button variant="contained" sx={{ mr: 2 }} onClick={() => navigate("/add-user")}>
        Add User
      </Button>

      <Button variant="outlined" color="error" onClick={logout}>
        Logout
      </Button>

      {/* Search Input */}
      <TextField
        label="Search users..."
        variant="outlined"
        sx={{ mt: 3, mb: 3, width: "50%" }}
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
          setPage(0);
        }}
      />

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Avatar</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedUsers.map((u) => (
              <TableRow key={u._id}>
                <TableCell>
                  <Avatar sx={{ bgcolor: "#00bcd4" }}>
                    {u.name[0].toUpperCase()}
                  </Avatar>
                </TableCell>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => navigate(`/edit/${u._id}`)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => deleteUser(u._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {paginatedUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} style={{ textAlign: "center", padding: 30 }}>
                  ❌ No matching users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={filteredUsers.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Paper>
    </Container>
  );
}
