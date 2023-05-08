'use client'

import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { useEffect, useState } from 'react'

interface Result {
  course: string | undefined
  student: string | undefined
  score: string | undefined
}

interface Student {
  id: number
  firstName: string
  familyName: string
  dateOfBirth: string
  emailAddress: string
}

interface Course {
  id: number
  courseName: string
}

export default function CreateResults() {
  const [courses, setCourses] = useState<Course[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [result, setResult] = useState<Result>({
    course: undefined,
    student: undefined,
    score: undefined,
  })
  const [formErrors, setFormErrors] = useState<string[]>([])
  const [snackbarOpen, setSnackbarOpen] = useState([false, true])

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`)
      const data = await response.json()
      setCourses(data)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchStudents = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/students`
      )
      const data = await response.json()
      setStudents(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchCourses()
    fetchStudents()
  }, [])

  const handleInputChange = (event: SelectChangeEvent) => {
    setResult({
      ...result,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const errors: string[] = []
    if (!result.course || !result.student || !result.score) {
      errors.push('All fields are required')
    }

    if (errors.length > 0) {
      setFormErrors(errors)
    } else {
      const isSuccess = await addResult(result)
      if (isSuccess) {
        setResult({
          course: undefined,
          student: undefined,
          score: undefined,
        })
        setFormErrors([])
      }
      setSnackbarOpen([true, isSuccess])
    }
  }

  const addResult = async (newResult: Result) => {
    // Add new result to the system
    console.log('Add result')
    console.log(newResult)
    console.log(process.env.REACT_APP_API_URL)

    const body = {
      courseId: newResult.course,
      studentId: newResult.student,
      score: newResult.score,
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/results`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
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
          <FormControl style={{ width: '200px' }}>
            <InputLabel>Course</InputLabel>
            <Select
              name="course"
              value={result.course}
              onChange={handleInputChange}
              required
            >
              {courses.map((course) => (
                <MenuItem key={course.id} value={course.id}>
                  {course.courseName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 xs={12}>
          <FormControl style={{ width: '200px' }}>
            <InputLabel>Student</InputLabel>
            <Select
              name="student"
              value={result.student}
              onChange={handleInputChange}
              required
            >
              {students.map((student) => (
                <MenuItem key={student.id} value={student.id}>
                  {student.firstName} {student.familyName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 xs={12}>
          <FormControl style={{ width: '200px' }}>
            <InputLabel>Score</InputLabel>
            <Select
              name="score"
              value={result.score}
              onChange={handleInputChange}
              required
            >
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
              <MenuItem value="C">C</MenuItem>
              <MenuItem value="D">D</MenuItem>
              <MenuItem value="E">E</MenuItem>
              <MenuItem value="F">F</MenuItem>
            </Select>
          </FormControl>
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
            {snackbarOpen[1] ? 'Result added successfully' : 'Result add fail'}
          </Alert>
        </Snackbar>
      </Grid2>
    </form>
  )
}
