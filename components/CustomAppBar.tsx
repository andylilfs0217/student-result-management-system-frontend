'use client'

import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import Link from 'next/link'

const ResponsiveAppBar = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  const drawerList = () => (
    <List>
      <Link href="/">
        <ListItem>
          <ListItemButton>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
      </Link>
      <Link href="/students/create">
        <ListItem>
          <ListItemButton>
            <ListItemText primary="Add New Students" />
          </ListItemButton>
        </ListItem>
      </Link>
      <Link href="/students/list">
        <ListItem>
          <ListItemButton>
            <ListItemText primary="Students List" />
          </ListItemButton>
        </ListItem>
      </Link>
      <Link href="/courses/create">
        <ListItem>
          <ListItemButton>
            <ListItemText primary="Add New Courses" />
          </ListItemButton>
        </ListItem>
      </Link>
      <Link href="/courses/list">
        <ListItem>
          <ListItemButton>
            <ListItemText primary="Courses List" />
          </ListItemButton>
        </ListItem>
      </Link>
      <Link href="/results/create">
        <ListItem>
          <ListItemButton>
            <ListItemText primary="Add New Results" />
          </ListItemButton>
        </ListItem>
      </Link>
      <Link href="/results/list">
        <ListItem>
          <ListItemButton>
            <ListItemText primary="Results List" />
          </ListItemButton>
        </ListItem>
      </Link>
    </List>
  )

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        {drawerList()}
      </Drawer>
    </React.Fragment>
  )
}
export default ResponsiveAppBar
