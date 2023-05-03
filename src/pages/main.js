import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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
}));

const CONTACTS = [
  { id: 1, name: 'John Smith', email: 'john@example.com', phone: '555-1234' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com', phone: '555-5678' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '555-9012' },
];

function ContactListPage() {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState(CONTACTS);
  const [addContactOpen, setAddContactOpen] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (id) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
  };

  const handleAddContactOpen = () => {
    setAddContactOpen(true);
  };

  const handleAddContactClose = () => {
    setAddContactOpen(false);
    setNewContactName('');
    setNewContactEmail('');
    setNewContactPhone('');
  };

  const handleNewContactNameChange = (event) => {
    setNewContactName(event.target.value);
  };

  const handleNewContactEmailChange = (event) => {
    setNewContactEmail(event.target.value);
  };

  const handleNewContactPhoneChange = (event) => {
    setNewContactPhone(event.target.value);
  };

  const handleAddContact = () => {
    const newContact = {
      id: contacts.length + 1,
      name: newContactName,
      email: newContactEmail,
      phone: newContactPhone,
    };
    setContacts([...contacts, newContact]);
    handleAddContactClose();
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <Button variant="contained" color="primary" onClick
          ={(event) => handleAddContactOpen()}>
          Add Contact
        </Button>
      </Paper>
      {filteredContacts.map((contact) => (
        <Grid item xs={12} key={contact.id}>
          <Paper className={classes.paper}>
            <Typography variant="h6">{contact.name}</Typography>
            <Typography variant="subtitle1">{contact.email}</Typography>
            <Typography variant="subtitle1">{contact.phone}</Typography>
            <DeleteIcon
              className={classes.deleteIcon}
              onClick={() => handleDelete(contact.id)}
            />
          </Paper>
        </Grid>
      ))}
      <Dialog open={addContactOpen} onClose={handleAddContactClose}>
        <DialogTitle>Add New Contact</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={newContactName}
            onChange={handleNewContactNameChange}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={newContactEmail}
            onChange={handleNewContactEmailChange}
          />
          <TextField
            margin="dense"
            label="Phone"
            type="tel"
            fullWidth
            value={newContactPhone}
            onChange={handleNewContactPhoneChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddContactClose}>Cancel</Button>
          <Button onClick={handleAddContact} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ContactListPage;