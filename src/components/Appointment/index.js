import React, { Fragment, useState } from "react";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Status from "./Status";
import Form from "./Form";
import Confirm from "./Confirm";

import useVisualMode from "../../hooks/useVisualMode";
import "./styles.scss";

// constants for transitions
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW);
    });
  }

  function cancel() {
    transition(DELETING);
    props.cancelInterview(props.id).then(() => {
      transition(EMPTY);
    });
  }

  function confirmDelete() {
    transition(CONFIRM);
  }

  function edit() {
    transition(EDIT);
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={confirmDelete}
          onEdit={edit}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === EDIT && (
        
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} name={props.interview.student} interviewer={props.interview.interviewer.id}/>
      )}
      {mode === CONFIRM && <Confirm onCancel={back} onConfirm={cancel} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Cancelling Interview" />}
    </article>
  );
}
