import React from "react";
import "./MeetOurTeam.css";
import { teamMembers } from "../../assets/data";

const MeetOurTeam = () => {
  return (
    <div className="meet-our-team">
      <h2>Meet Our Team</h2>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-card">
            <img src={member.image} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetOurTeam;
