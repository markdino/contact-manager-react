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
          : "Contact is empty"}
    </div>
  );
}

export default Contact;
