import React from "react";
import Search from './search'
import List from "./list";
import Loading from './loading'


const Contacts = ({ contact, user, loading, onDelete, getContact }) => {
  let contacts = ''
  if (typeof contact === 'string') {
    contacts = <p className='text-center text-muted'>{contact}</p>
  } else if (contact === null || contact.length < 1) {
    contacts = <p className='text-center text-muted'>Contact is empty</p>
  } else {
    contacts = contact.map(person => (
      <List person={person} key={person._id} user={user} onDelete={onDelete} />
    ))
  }

  return (
    <React.Fragment>
      <Search onSearch={getContact} />
      <div className="container p-10">
        {loading ? <Loading /> : contacts}
      </div>
    </React.Fragment>
  );
}

export default Contacts;
