import React, { useState }from "react";
import InterviewerList from "../../components/InterviewerList";
import Button from "../../components/Button";


const Form = (props) => {
  
  const cancel = () => {
    props.onCancel();
  }
  
  const reset = () => {
    setName("");
    setInterviewer(null);
    cancel();
  }

  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [name, setName] = useState(props.name || "");

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            // we need this event here because the new value is 
            // not predictable, free-form text, unlike the interviewer list
            onChange={(event) => setName(event.target.value)}
            
             
            /*
          This must be a controlled component
        */
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          // below, setInterviewer is a canned function - a method of the 
          // InterviewerList component, if you like. We can use it because
          // unlike the freeform text in input, it is handling a change of
          // a small list of values (5 interviewers)
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={reset}>Cancel</Button>
          <Button confirm onClick={props.onSave}>Save</Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
