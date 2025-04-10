import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CircularProgress,
  Alert,
  IconButton,
  Snackbar,
} from "@mui/material";
import { Delete as DeleteIcon, Close as CloseIcon } from "@mui/icons-material";

// ✅ Use 'id' instead of '_id' to match backend
interface SavedProject {
  id: number;
  title: string;
  description: string;
  technologies: string;
  link: string;
  category: string;
}

const SavedProjects = () => {
  const [projects, setProjects] = useState<SavedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const fetchSavedProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/saved");
      setProjects(res.data); // Make sure API returns array with 'id'
    } catch (err) {
      setError("Failed to fetch saved projects.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/saved/${id}`);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setSnackbarMessage("Project deleted successfully!");
    } catch (err) {
      setSnackbarMessage("Failed to delete the project.");
    }
  };

  useEffect(() => {
    fetchSavedProjects();
  }, []);

  if (loading) {
    return (
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 5 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Saved Projects
      </Typography>
      <Grid container spacing={4}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Card sx={{ minHeight: 250 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {project.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {project.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Technologies:</strong> {project.technologies}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Category:</strong> {project.category}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleDelete(project.id)} color="error">
                  <DeleteIcon />
                </IconButton>
                <Button
                  size="small"
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: "#FA6E46" }}
                >
                  View
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={3000}
        onClose={() => setSnackbarMessage("")}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        action={
          <IconButton size="small" color="inherit" onClick={() => setSnackbarMessage("")}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Container>
  );
};

export default SavedProjects;
