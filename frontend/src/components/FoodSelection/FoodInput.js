import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";

export const FoodInput = ({ input, setInput, toggleSearch }) => {
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    toggleSearch((prev) => !prev);
  };

  return (
    <div
      style={{
        marginTop: "30px",
        marginBottom: "30px",
      }}
    >
      <Box
        component={"div"}
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
        }}
      >
        <TextField
          required
          label={"Food name"}
          value={input ?? ""}
          onChange={handleInput}
        />
        <Button variant={"contained"} onClick={handleSearch}>
          Search
        </Button>
      </Box>
    </div>
  );
};
