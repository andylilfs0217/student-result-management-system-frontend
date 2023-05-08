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

interface Student {
  firstName: string
  familyName: string
  dateOfBirth: string
  emailAddress: string
}

export default function CreateStudents() {
  const [student, setStudent] = useState<Student>({
    firstName: '',
    familyName: '',
    dateOfBirth: '',
    emailAddress: '',
  })
  const [formErrors, setFormErrors] = useState<string[]>([])
  const [snackbarOpen, setSnackbarOpen] = useState([false, true])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStudent({
      ...student,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const errors: string[] = []
    if (
      !student.firstName ||
      !student.familyName ||
      !student.dateOfBirth ||
      !student.emailAddress
    ) {
      errors.push('All fields are required')
    }
    if (!isValidEmail(student.emailAddress)) {
      errors.push('Invalid email address')
    }
    if (!isValidDateOfBirth(student.dateOfBirth)) {
      errors.push('Invalid date of birth. You should be at least 10 years old.')
    }

    if (errors.length > 0) {
      setFormErrors(errors)
    } else {
      const isSuccess = await addStudent(student)
      if (isSuccess) {
        setStudent({
          firstName: '',
          familyName: '',
          dateOfBirth: '',
          emailAddress: '',
        })
        setFormErrors([])
      }
      setSnackbarOpen([true, isSuccess])
    }
  }

  const isValidEmail = (email: string) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const isValidDateOfBirth = (dateOfBirthString: string) => {
    const dateOfBirth = new Date(dateOfBirthString)
    if (!dateOfBirth) {
      return false
    }
    const today = new Date()
    const dob = new Date(dateOfBirth)
    const age = today.getFullYear() - dob.getFullYear()
    if (today < new Date(dob.setFullYear(today.getFullYear()))) {
      return age >= 10
    }
    return age >= 10
  }

  const addStudent = async (newStudent: Student) => {
    // Add new student to the system
    console.log('Add student')
    console.log(newStudent)
    console.log(process.env.REACT_APP_API_URL)

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/students`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStudent),
      }
    )

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
            id="firstName"
            label="First Name"
            name="firstName"
            value={student.firstName}
            onChange={handleInputChange}
            required
          />
        </Grid2>
        <Grid2 xs={12}>
          <TextField
            id="familyName"
            label="Family Name"
            name="familyName"
            value={student.familyName}
            onChange={handleInputChange}
            required
          />
        </Grid2>
        <Grid2 xs={12}>
          <TextField
            type="date"
            id="dateOfBirth"
            label="Date of birth"
            name="dateOfBirth"
            value={student.dateOfBirth}
            onChange={handleInputChange}
            required
          />
        </Grid2>
        <Grid2 xs={12}>
          <TextField
            id="email"
            label="Email address"
            name="emailAddress"
            value={student.emailAddress}
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
            {snackbarOpen[1]
              ? 'Student added successfully'
              : 'Student add fail'}
          </Alert>
        </Snackbar>
      </Grid2>
    </form>
  )
}
