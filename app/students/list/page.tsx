'use client'
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from '@mui/material'
import { useState, useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'

interface Student {
  id: number
  firstName: string
  familyName: string
  dateOfBirth: string
  emailAddress: string
}

export default function StudentList() {
  const [students, setStudents] = useState([])

  const fetchData = async () => {
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
    fetchData()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/students/${id}`,
        {
          method: 'DELETE',
        }
      )

      if (!response.ok) {
        throw new Error('Failed to delete student')
      }

      // Refresh the student list after successful delete
      fetchData()
    } catch (error) {
      console.error(error)
      alert('Failed to delete student')
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First & Family Name</TableCell>
            <TableCell>Date of Birth</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student: Student) => (
            <TableRow key={student.id}>
              <TableCell>
                {student.firstName} {student.familyName}
              </TableCell>
              <TableCell>{student.dateOfBirth}</TableCell>
              <TableCell>{student.emailAddress}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleDelete(student.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
