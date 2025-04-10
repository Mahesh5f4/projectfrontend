import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  CircularProgress,
  Alert,
  TextField,
  Snackbar,
  IconButton,
  CardMedia,
} from "@mui/material";
import {
  BookmarkAdd,
  Close as CloseIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  author: string;
  image_url: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/projects");
      setProjects(response.data);
      setFilteredProjects(response.data);
    } catch (err) {
      setError("Failed to fetch projects. Please check the API endpoint and server status.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (project: Project) => {
    setSavingId(project.id);
    try {
      await axios.post("http://localhost:5000/api/saved", project);
      setSnackbarMessage("Project saved successfully!");
    } catch (err) {
      setSnackbarMessage("Failed to save project");
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`);
      setProjects((prev) => prev.filter((proj) => proj.id !== id));
      setFilteredProjects((prev) => prev.filter((proj) => proj.id !== id));
      setSnackbarMessage("Project deleted successfully!");
    } catch (err) {
      setSnackbarMessage("Failed to delete project");
    } finally {
      setDeletingId(null);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = projects.filter(
      (project) =>
        project.title.toLowerCase().includes(value) ||
        project.description.toLowerCase().includes(value) ||
        project.category.toLowerCase().includes(value) ||
        project.author.toLowerCase().includes(value)
    );
    setFilteredProjects(filtered);
  };

  useEffect(() => {
    fetchProjects();
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
        All Projects
      </Typography>

      <TextField
        label="Search Projects"
        variant="outlined"
        fullWidth
        sx={{ mb: 3 }}
        value={searchTerm}
        onChange={handleSearch}
      />

      <Grid container spacing={4}>
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <Card
                sx={{
                  minHeight: 350,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: 3,
                  boxShadow: 3,
                }}
              >
                {project.image_url && (
                  <CardMedia
                    component="img"
                    height="180"
                    image={project.image_url}
                    alt={project.title}
                  />
                )}

                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {project.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Category:</strong> {project.category}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Author:</strong> {project.author}
                  </Typography>
                </CardContent>

                <CardActions>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<BookmarkAdd />}
                    onClick={() => handleSave(project)}
                    disabled={savingId === project.id}
                  >
                    {savingId === project.id ? "Saving..." : "Save"}
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(project.id)}
                    disabled={deletingId === project.id}
                  >
                    {deletingId === project.id ? "Deleting..." : "Delete"}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ ml: 2 }}>
            No projects found.
          </Typography>
        )}
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

export default Projects;
