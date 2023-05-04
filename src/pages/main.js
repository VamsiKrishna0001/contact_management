import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    marginBottom: theme.spacing(2),
  },
  search: {
    marginBottom: theme.spacing(2),
  },
  deleteIcon: {
    cursor: 'pointer',
    marginLeft: theme.spacing(2),
  },
  editIcon: {
    cursor: 'pointer',
    marginRight: theme.spacing(2),
  },
}));

const CONTACTS = [
  { id: 1, first_name: 'John ', last_name: 'Smith', phone: '555-1234' },
  { id: 2, first_name: 'Jane ', last_name: 'Doe', phone: '555-5678' },
  { id: 3, first_name: 'Bob ', last_name: 'Johnson', phone: '555-9012' },
];

function ContactListPage() {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState();
  const [contacts, setContacts] = useState([]);
  const [addContactOpen, setAddContactOpen] = useState(false);
  const [editContactOpen, setEditContactOpen] = useState(false);
  const initialValues = {
    first_name: "",
    last_name: "",
    phone: ""
  }
  const BASE_URL = 'http://127.0.0.1:7000/test/';
  const [formValues, setFormValues] = useState(initialValues);

  function isNumeric(value) {
    return /^-?\d+$/.test(value);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSearchChange = async (event) => {
    console.log("type Of",);
    setSearchTerm(event.target.value);
    if (isNumeric(event.target.value)) {
      await filterContactByPhone(event.target.value);
    } else {
      await filterContactByName(event.target.value);
    }
  };

  const handleDelete = async (id) => {
    await deleteContact(id);
  };
  const handleEdit = (id) => {
    handleEditContactOpen(id);
  };

  const handleAddContactOpen = () => {
    setAddContactOpen(true);
  };

  const handleAddContactClose = () => {
    setAddContactOpen(false);
  };
  const handleEditContactOpen = async (id) => {
    setEditContactOpen(true);
    console.log("id", id);
    await getEditContact(id);
  };

  const handleEditContactClose = () => {
    setEditContactOpen(false);
    setFormValues(initialValues);
  };

  const getContactList = async () => {
    let res = await axios.get(BASE_URL + 'contacts/');
    if (res.status >= 200 && res.status <= 301) {
      setContacts(res.data)
    }
  }

  const createContact = async (data) => {
    let res = await axios.post(BASE_URL + `contacts/`, data);
    if (res.status >= 200 && res.status <= 301) {
      getContactList();
    }
  }
  const getEditContact = async (id) => {
    let res = await axios.get(BASE_URL + `contacts/${id}/`);
    if (res.status >= 200 && res.status <= 301) {
      setFormValues(res.data)
    }
  }
  const editContact = async (data) => {
    let res = await axios.put(BASE_URL + `contacts/${data.id}/`, data);
    if (res.status >= 200 && res.status <= 301) {
      getContactList();
    }
  }

  const deleteContact = async (id) => {
    let res = await axios.delete(BASE_URL + `contacts/${id}/`);
    if (res.status >= 200 && res.status <= 301) {
      getContactList();
    }
  }

  const filterContactByName = async (data) => {
    let res = await axios.get(BASE_URL + `contacts?name=${data}`);
    if (res.status >= 200 && res.status <= 301) {
      setContacts(res.data);
    }
  }
  const filterContactByPhone = async (data) => {
    let res = await axios.get(BASE_URL + `contacts?phone=${data}`);
    if (res.status >= 200 && res.status <= 301) {
      setContacts(res.data);
    }
  }




  useEffect(() => {
    getContactList();
  }, [])

  const handleAddContact = async () => {
    await createContact(formValues);
    setFormValues(initialValues);
    handleAddContactClose();
  };
  const handleEditContact = async () => {
    await editContact(formValues);
    handleEditContactClose();
  };

  // const filteredContacts = contacts.filter((contact) =>
  //   contact.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography variant="h4" align="center" gutterBottom>
        Contact List
      </Typography>
      <Paper className={classes.paper}>
        <TextField
          label="Search Contacts"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          className={classes.search}
        />
        <Button variant="contained" sx={{ marginLeft: "10px" }} size='small' color="primary" onClick
          ={(event) => handleAddContactOpen()}>
          Add Contact
        </Button>
      </Paper>
      {
        contacts.length > 0 ?
          (
            <>
              {contacts.map((contact) => (
                <Grid item xs={12} key={contact.id}>
                  <Paper className={classes.paper}>
                    <Typography variant="h6">{contact.first_name + " " + contact.last_name}</Typography>
                    <Typography variant="subtitle1">{contact.phone}</Typography>
                    <span>
                      <EditIcon
                        className={classes.deleteIcon}
                        onClick={() => handleEdit(contact.id)}
                      />
                      <DeleteIcon
                        className={classes.deleteIcon}
                        onClick={() => handleDelete(contact.id)}
                      />
                    </span>
                  </Paper>
                </Grid>
              ))}
            </>
          ) : (
            <Typography variant="h6">No Contacts </Typography>
          )
      }

      <Dialog open={addContactOpen} onClose={handleEditContactClose}>
        <DialogTitle>Add New Contact</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            type="text"
            fullWidth
            name="first_name"
            value={formValues.first_name}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            margin="dense"
            label="Last Name"
            type="last_name"
            fullWidth
            name="last_name"
            value={formValues.last_name}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            margin="dense"
            label="Phone"
            type="tel"
            fullWidth
            name="phone"
            value={formValues.phone}
            onChange={(e) => handleChange(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddContactClose}>Cancel</Button>
          <Button onClick={handleAddContact} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editContactOpen} onClose={handleEditContactClose}>
        <DialogTitle>Edit New Contact</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            type="text"
            name="first_name"
            value={formValues.first_name}
            fullWidth
            onChange={(e) => handleChange(e)}
          />
          <TextField
            margin="dense"
            label="Last Name"
            type="last_name"
            fullWidth
            name="last_name"
            value={formValues.last_name}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            margin="dense"
            label="Phone"
            type="tel"
            fullWidth
            name="phone"
            value={formValues.phone}
            onChange={(e) => handleChange(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditContactClose}>Cancel</Button>
          <Button onClick={handleEditContact} color="primary">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ContactListPage;