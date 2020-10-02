// selector in the context of React is a function that accepts state as a parameter

//this returns an array of appointments for that day

function getAppointmentsForDay(state, day) {
  const todaysInterviewers = [];

  for (const dayInfo of state.days) {
    if (day === dayInfo.name) {
      for (const appID of dayInfo.appointments) {
        if (appID === state.appointments[appID].id) {
          todaysInterviewers.push(state.appointments[appID]);
        }
      }
    }
  }
  return todaysInterviewers;
}

function getInterview(state, interview) {
  // return an object that contains the interview data if it is passed an object that contains an interviewer
  // if there is no interview, return null, otherwise compose an object that has all the needed data to render
  return (interview) ? { "student": interview.student, "interviewer": state.interviewers[interview.interviewer]} : null;
}

function getInterviewersForDay(state, day) {
  const todaysInterviewers = [];

  for (const dayInfo of state.days) {
    if (day === dayInfo.name) {
      for (const intID of dayInfo.interviewers) {
        if (intID === state.interviewers[intID].id) {
          todaysInterviewers.push(state.interviewers[intID]);
        }
      }
    }
  }
  return todaysInterviewers;
}

export { getAppointmentsForDay, getInterview, getInterviewersForDay }

