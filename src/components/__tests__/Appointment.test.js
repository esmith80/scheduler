import React from "react";
import { render, cleanup } from "@testing-library/react";
import Appointment from "components/Appointment/index";

afterEach(cleanup);

const interviewers = {
  "1": {  
    "id": 1,
    "name": "Sylvia Palmer",
    "avatar": "https://i.imgur.com/LpaY82x.png"
  },
  "2": {
    id: 2,
    name: "Tori Malcolm",
    avatar: "https://i.imgur.com/Nmx0Qxo.png"
  }
};

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment      
      key={1}
      id={1}
      time={"12pm"}
      interview={{interviewer: 1, student: "Maria Boucher"}}
      interviewers={interviewers}
      bookInterview={() => {}}
      cancelInterview={() => {}}
    />);
  });
});