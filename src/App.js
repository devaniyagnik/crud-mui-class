import React, { useState } from "react";
import {
  TextField,
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,Container
} from "@mui/material";


const initialFormData = {
  name: "",
  number: "",
  age: "",
  hobbies: [],
  gender: "",
  language: ""
};

const App = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [items, setItems] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editItemIndex, setEditItemIndex] = useState(null);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        hobbies: checked
          ? [...prevData.hobbies, value]
          : prevData.hobbies.filter((hobby) => hobby !== value)
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editMode) {
      // Edit item
      setItems((prevItems) =>
        prevItems.map((item, index) =>
          index === editItemIndex ? formData : item
        )
      );
    } else {
      // Add item
      setItems((prevItems) => [...prevItems, formData]);
    }
    setFormData(initialFormData);
    setEditMode(false);
    setEditItemIndex(null);
  };

  const handleEdit = (index) => {
    const editItem = items[index];
    setFormData(editItem);
    setEditMode(true);
    setEditItemIndex(index);
  };

  const handleDelete = (index) => {
    setItems((prevItems) => prevItems.filter((item, i) => i !== index));
  };

  return (
    
    <div className="crud-app">
      <h2>CRUD App</h2>
      <Container maxWidth="sm">
      <form onSubmit={handleSubmit} className="form">
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Number"
          name="number"
          value={formData.number}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Hobbies:</FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.hobbies.includes("Reading")}
                onChange={handleChange}
                name="hobbies"
                value="Reading"
              />
            }
            label="Reading"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.hobbies.includes("Sports")}
                onChange={handleChange}
                name="hobbies"
                value="Sports"
              />
            }
            label="Sports"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.hobbies.includes("Cooking")}
                onChange={handleChange}
                name="hobbies"
                value="Cooking"
              />
            }
            label="Cooking"
          />
        </FormControl><br />
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Gender:</FormLabel>
          <RadioGroup
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            row
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <FormLabel component="legend">Language:</FormLabel>
          <Select
            name="language"
            value={formData.language}
            onChange={handleChange}
            required
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="English">English</MenuItem>
            <MenuItem value="Spanish">Spanish</MenuItem>
            <MenuItem value="French">French</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          {editMode ? "Update" : "Add"}
        </Button>
      </form>
      </Container>
      <div style={{ overflowX: "scroll" }}>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Number</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Hobbies</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Language</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.number}</TableCell>
              <TableCell>{item.age}</TableCell>
              <TableCell>{item.hobbies.join(", ")}</TableCell>
              <TableCell>{item.gender}</TableCell>
              <TableCell>{item.language}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(index)}>Edit</Button>
                <Button onClick={() => handleDelete(index)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
      <div>
        <h1>hello</h1>
      </div>
    </div>
    
    
  );
};

export default App;
