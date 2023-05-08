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

interface Course {
  id: number
  courseName: string
}

export default function CourseList() {
  const [courses, setCourses] = useState<Course[]>([])

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`)
      const data = await response.json()
      setCourses(data)
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
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`,
        {
          method: 'DELETE',
        }
      )

      if (!response.ok) {
        throw new Error('Failed to delete course')
      }

      // Refresh the course list after successful delete
      fetchData()
    } catch (error) {
      console.error(error)
      alert('Failed to delete course')
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Course Name</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((course: Course) => (
            <TableRow key={course.id}>
              <TableCell>{course.courseName}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleDelete(course.id)}>
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
