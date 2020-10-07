import React from "react";
import 'components/InterviewerList.scss';
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types'; 


// Our InterviewerList takes in three props:
// 
// interviewers:array - an array of objects containing the information of each interviewer
// interviewer:number - the id of an interviewer
// setInterviewer:function - a function that accepts an interviewer id


export default function InterviewerList (props) {
  
  const interviewers = props.interviewers.map((interviewer) => {
     return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        setInterviewer={() => props.onChange(interviewer.id)}
        selected={props.value === interviewer.id}
      />
     )
  });

  return (
    <section className="interviewers__header">
      <h4 className="interviewer__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};
