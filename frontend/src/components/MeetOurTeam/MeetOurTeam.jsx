import React from "react";
import "./MeetOurTeam.css";
import { team } from "../../assets/data";
import { useTranslation } from "react-i18next"; // Import useTranslation

const MeetOurTeam = () => {
  const { t } = useTranslation(); // Initialize the translation hook

  return (
    <div className="meet-our-team">
      <h2>{t(team.title)}</h2> {/* Translate the title */}
      <div className="team-grid">
        {team.members.map((member, index) => (
          <div key={index} className="team-card">
            <img src={member.image} alt={t(member.name)} />{" "}
            {/* Translate the name */}
            <h3>{t(member.name)}</h3> {/* Translate the member's name */}
            <p>{t(member.role)}</p> {/* Translate the member's role */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetOurTeam;
