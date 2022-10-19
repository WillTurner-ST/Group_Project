import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormControl, Input, InputLabel, Button } from "@mui/material";

const Food = () => {
  const [food, setFood] = useState("");
  const [calories, setCalories] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/food", {
        food,
        calories,
      })
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data.err.errors);
        setErrors(err.response.data.err.errors);
      });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", margin: "20px" }}
      >
        <FormControl>
          <InputLabel htmlFor="name">Name:</InputLabel>
          <Input
            type="text"
            onChange={(e) => setFood(e.target.value)}
            value={food}
          ></Input>
          {errors.food ? <p>{errors.food.message}</p> : null}
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="calories">Calories:</InputLabel>
          <Input
            type="number"
            onChange={(e) => setCalories(e.target.value)}
            value={calories}
          ></Input>
          {errors.calories ? <p>{errors.calories.message}</p> : null}
        </FormControl>
        <FormControl>
          <Button type="submit">Save Changes</Button>
        </FormControl>
      </form>
    </div>
  );
};

export default Food;
