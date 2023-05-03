import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper, TextField, Typography } from '@mui/material';
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (id) => {
    console.log("id.. ", id);
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
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
      </Paper>
      <Grid container spacing={2}>
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
      </Grid>
    </Container>
  );
}

export default ContactListPage;
