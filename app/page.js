'use client';

import {
  Box,
  TableContainer,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Table,
  Paper,
  Button,
  Typography,
  TextField,
  Modal
} from "@mui/material";
import { useEffect, useState } from "react";
import { query, collection, getDocs, getDoc, setDoc, doc, deleteDoc } from "firebase/firestore";
import { firestore } from "../firebase";

export default function Home() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [newItem, setNewItem] = useState('')

  const updateItems = async () => {
    const snapshot = query(collection(firestore, "pantry"));
    const docs = await getDocs(snapshot)
    const itemList = []

    docs.forEach(doc => {
      itemList.push({
        name: doc.id,
        ...doc.data()
      })
    })

    setItems(itemList)
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "pantry"), item);
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const { quantity } = docSnap.data()

      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, { quantity: quantity - 1 })
      }
    }

    updateItems()
  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "pantry"), item);
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      await setDoc(docRef, { quantity: quantity + 1 })
    } else {
      await setDoc(docRef, { quantity: 1 })
    }

    updateItems()
  }

  useEffect(() => {
    updateItems()
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        height="500px"
        overflow={"auto"}
        display="flex"
        flexDirection="column"
        alignItems="end"
        gap={5}
        p={5}
        border={1}
      >
        <Typography variant="h4" alignSelf={"center"}>All Pantry Items</Typography>
        <Button variant="outlined" m={20} onClick={handleOpen} >Add Item</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            backgroundColor="white"
            padding={5}
            position="absolute"
            width={500}
            top="50%"
            left="50%"
            sx={{
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2" marginBottom={5}>
              Add Item
            </Typography>

            <Box
              display="flex"
              flexDirection="column"
              gap={2}
            >
              <TextField id="filled-basic" label="Item name" variant="filled"
                onChange={(e) => setNewItem(e.target.value)} />

              <Box
                display="flex"
                alignSelf="end"
                gap={2}
              >
                <Button
                  variant="outlined"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    alignSelf: "flex-end"
                  }}
                  onClick={() => {
                    addItem(newItem)
                    handleClose()
                    setNewItem('')
                  }}
                >
                  Add
                </Button>

              </Box>
            </Box>
          </Box>
        </Modal>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow
                  key={item.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="item">
                    {item.name}
                  </TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      sx={{
                        alignSelf: "flex-end"
                      }}
                      onClick={() => {
                        removeItem(item.name)
                      }}
                    >
                      -
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        alignSelf: "flex-end"
                      }}
                      onClick={() => {
                        addItem(item.name)
                      }}
                    >
                      +
                    </Button>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
