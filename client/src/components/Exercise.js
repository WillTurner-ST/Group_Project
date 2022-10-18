import React, { useState } from 'react'
import { FormControl, Input, InputLabel, MenuItem, Select, Button } from '@mui/material';
import axios from 'axios'; 
import {useNavigate} from 'react-router-dom'

const Exercise = (props) => {
    const [exercise, setExercise] = useState('')
    const [duration, setDuration] = useState(0)
    const [burnedcalories, setBurnedcalories] = useState(0)
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()
    const {method, url} = props
    const typeHandler = (e) =>{
        setExercise(e.target.value)
    }

    const submitHandler = (e) =>{
        e.preventDefault()
        console.log(exercise)
        console.log(duration)
        console.log(burnedcalories)
        axios({method, url, data: {exercise, duration, burnedcalories}})
        .then((res)=>{
            console.log(res);
            navigate('/')})
        .catch(err=>{
            console.log(err)
            const errorResponse = err.response.data.err.errors;
            
            const errorArray = [];
            for (const key of Object.keys(errorResponse)) {
                errorArray.push(errorResponse[key].message)
            }
            // console.log(errorResponse);
            setErrors(errorArray)
            console.log(errors)
    })
    }
  return (
    <div>
        <form style={{display: 'flex', flexDirection: 'column', margin: '20px'}} onSubmit={submitHandler}>
            <FormControl>
                <InputLabel htmlFor='type'>Type of exercise:</InputLabel>
                <Select onChange={typeHandler}>
                    <MenuItem name='type' value='Lunges'>Lunges</MenuItem>
                    <MenuItem name='type' value='Pushups'>Pushups</MenuItem>
                    <MenuItem name='type' value='Squats'>Squats</MenuItem>
                    <MenuItem name='type' value='Pullups'>Pullups</MenuItem>
                    <MenuItem name='type' value='Burpees'>Burpees</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor='duration' >Duration (minutes):</InputLabel>
                <Input type='number' name='duration' onChange={(e)=>setDuration(e.target.value)}></Input>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor='burnedcalories' >Calories</InputLabel>
                <Input type='number' name='burnedcalories' onChange={(e)=>setBurnedcalories(e.target.value)}></Input>
            </FormControl>
            <FormControl>
                    <Button type='submit'>Save Changes</Button>
            </FormControl>
        </form>
    </div>
  )
}

export default Exercise