import React from "react";
import { ReactComponent as DeleteSvg } from "../assets/svg/trash.svg";
import { ReactComponent as UserSvg } from "../assets/svg/user.svg";
import "./list.css";

const List = props => {
  const { _id, avatar, name, owner } = props.person;
  return (
    <section id="contact-list" className="row align-item-center my-10">
      <section className="avatar-circle">
        {avatar ? (
          <img src={avatar} alt="avatar" className="avatar-img" />
        ) : (
            <UserSvg className="avatar-img" />
          )}
      </section>
      <a className="name" href={`/contact/${_id}`}>
        {name}
      </a>
      <section>
        {!props.user || props.user._id !== owner
          ? <button className="delete delete-muted" title="Delete disabled" >
            <DeleteSvg className="delete-svg muted-svg" />
          </button>
          : <button className="delete" title="Delete contact" onClick={() => props.onDelete(_id)}>
            <DeleteSvg className="delete-svg" />
          </button>
        }
      </section>
    </section>
  );
};

export default List;
