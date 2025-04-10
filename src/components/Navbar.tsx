import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [cartCount] = useState(2);
  const [searchQuery, setSearchQuery] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();

  const tabItems = [
    { label: "Projects", path: "/projects" },
    { label: "Add Projects", path: "/add-project" },
    { label: "Saved Projects", path: "/saved-projects" },
    { label: "Portfolio", path: "/portfolio" },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    navigate(tabItems[newValue].path);
  };

  return (
    <AppBar position="fixed" sx={{ bgcolor: "#fff", boxShadow: 3, zIndex: 1300 }}>
      <Toolbar sx={{ justifyContent: "space-between", px: 4 }}>
        {/* Left: Logo + Sidebar Toggle */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          <IconButton edge="start" onClick={onMenuClick}>
            <MenuIcon sx={{ color: "#FA6E46" }} />
          </IconButton>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#FA6E46" }}>
            MyPortfolio
          </Typography>
        </Box>

        {/* Center: Tabs */}
        {!isMobile && (
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              textColor="primary"
              indicatorColor="secondary"
              sx={{
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: 500,
                  mx: 2,
                },
              }}
            >
              {tabItems.map((item, i) => (
                <Tab key={i} label={item.label} />
              ))}
            </Tabs>
          </Box>
        )}

        {/* Right: Search + Cart */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "#f2f2f2",
              borderRadius: 2,
              px: 2,
              py: 0.5,
              width: isMobile ? 130 : 240,
            }}
          >
            <SearchIcon sx={{ color: "#888", mr: 1 }} />
            <InputBase
              placeholder="Search Projects"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ fontSize: 14 }}
            />
          </Box>
          <IconButton>
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCartIcon sx={{ color: "#FA6E46" }} />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
