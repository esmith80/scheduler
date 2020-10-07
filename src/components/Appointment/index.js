import React, { Fragment, useState } from "react";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Status from "./Status";
import Form from "./Form";
import Confirm from "./Confirm";
import Error from "./Error";

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
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  
  function save(name, interviewer, createMode) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.bookInterview(props.id, interview, createMode)
    .then(() => {
      transition(SHOW);
    })
    .catch(() => {
      transition(ERROR_SAVE, true);
    });
  }

  function destroy() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY);
    })
    .catch(() => {
      transition(ERROR_DELETE, true);
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
    <article className="appointment" data-testid="appointment" >
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirmDelete}
          onEdit={edit}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} createMode={true}/>
      )}
      {mode === EDIT && (
        
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} name={props.interview.student} interviewer={props.interview.interviewer.id} createMode={false} />
      )}
      {mode === CONFIRM && <Confirm onCancel={back} onConfirm={destroy} />}
      {mode === ERROR_SAVE && <Error message="There was an error. Your appointment has not been saved." onClose={back} />}
      {mode === ERROR_DELETE && <Error message="There was an error. Your appointment has not been deleted." onClose={back} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Cancelling Interview" />}
    </article>
  );
}
