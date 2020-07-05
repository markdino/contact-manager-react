import React from "react";
import List from "../components/list";
import Loading from './loading'


const Contact = ({ contact, user, loading, onDelete }) => {

  return (
    <div className="container p-10">
      {loading
        ? <Loading />
        : contact
          ? contact.map(person => (
            <List person={person} key={person._id} user={user} onDelete={onDelete} />
          ))
          : <p className='text-center text-muted'>Contact is empty</p>}
    </div>
  );
}

export default Contact;
