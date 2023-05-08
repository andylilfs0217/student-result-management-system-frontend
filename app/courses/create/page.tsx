'use client'

import {
  Alert,
  Box,
  Button,
  FormControl,
  Snackbar,
  TextField,
} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { useState } from 'react'

export default function CreateCourses() {
  const [courseName, setCourseName] = useState('')
  const [formErrors, setFormErrors] = useState<string[]>([])
  const [snackbarOpen, setSnackbarOpen] = useState([false, true])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCourseName(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const errors: string[] = []
    if (courseName == '' || !courseName) {
      errors.push('All fields are required')
    }

    if (errors.length > 0) {
      setFormErrors(errors)
    } else {
      const isSuccess = await addCourse(courseName)
      if (isSuccess) {
        setCourseName('')
        setFormErrors([])
      }
      setSnackbarOpen([true, isSuccess])
    }
  }

  const addCourse = async (newCourse: string) => {
    // Add new course to the system
    console.log('Add course')
    console.log(newCourse)
    console.log(process.env.REACT_APP_API_URL)

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ courseName: newCourse }),
    })

    console.log(response.json())

    return response.ok
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen([false, true])
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid2 container spacing={2}>
        <Grid2 xs={12}>
          <TextField
            id="courseName"
            label="Course Name"
            name="courseName"
            value={courseName}
            onChange={handleInputChange}
            required
          />
        </Grid2>
        <Grid2 xs={12}>
          {formErrors.length > 0 && (
            <ul>
              {formErrors.map((error) => (
                <div key={error}>{error}</div>
              ))}
            </ul>
          )}
        </Grid2>
        <Grid2 xs={12}>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Grid2>
        <Snackbar
          open={snackbarOpen[0]}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarOpen[1] ? 'success' : 'warning'}
          >
            {snackbarOpen[1] ? 'Course added successfully' : 'Course add fail'}
          </Alert>
        </Snackbar>
      </Grid2>
    </form>
  )
}
