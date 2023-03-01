import { Component } from "react"
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Container } from "./Container.styled";
import { Filter } from "./Filter/Filter";
import { GlobalStyles } from "./Global.styled";

export class App extends Component {
  state = {
    contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: ''
  }

  addContact = newContact => {
    this.setState(prevState => {
      return [...prevState.contacts].some(contact => contact.name.toLowerCase() === newContact.name.toLowerCase())
        ? alert(`${newContact.name} is already in contacts.`)
        : { contacts: [...prevState.contacts, newContact] }
    });
  }

  deleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== contactId)
      }
    });
  }

  changeFilter = e => {
    this.setState({filter: e.currentTarget.value})
  }

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  }

  render() {
    const filteredContacts = this.getFilteredContacts();

    return (
    <Container>
      <GlobalStyles />
      <h1>Phonebook</h1>
      <ContactForm onSave={this.addContact} />
      <h2>Contacts</h2>
      <Filter value={this.state.filter} onChange={this.changeFilter} />
      <ContactList contacts={filteredContacts} onDelete={this.deleteContact} />
    </Container>
  );
  }
};
