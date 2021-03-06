import React, { useState } from "react";
import InterviewerList from "../../components/InterviewerList";
import Button from "../../components/Button";

const Form = (props) => {
  const validate = () => {
    const nameCheck = name.trim();
    if (!nameCheck && !interviewer) {
      setError("Please type your name and select an interviewer");
      return;
    } else if (!nameCheck) {
      setError("Please type your name");
      return;
    } else if (!interviewer) {
      setError("Please select an interviewer");
      return;
    } else if (nameCheck.length < 2) {
      setError("Name must be at least two characters (spaces don't count!)");
      return;
    }
    setError("");
    props.onSave(name, interviewer);
  };

  const cancel = () => {
    props.onCancel();
  };

  const reset = () => {
    setName("");
    setInterviewer(null);
    cancel();
  };

  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [name, setName] = useState(props.name || "");
  const [error, setError] = useState("");

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
          <InterviewerList
            interviewers={props.interviewers}
            value={interviewer}
            onChange={setInterviewer}
          />
        </form>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={reset}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
