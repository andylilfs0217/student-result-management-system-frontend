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

interface Result {
  id: string
  course: Course
  student: Student
  score: string
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

export default function ResultList() {
  const [results, setResults] = useState<Result[]>([])

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/results`)
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Course</TableCell>
            <TableCell>Student</TableCell>
            <TableCell>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((result: Result) => (
            <TableRow key={result.id}>
              <TableCell>{result.course.courseName}</TableCell>
              <TableCell>
                {result.student.firstName} {result.student.familyName}
              </TableCell>
              <TableCell>{result.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
