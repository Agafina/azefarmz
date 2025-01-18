import React from "react";
import CompanyHistory from "../../components/CompanyHistory/CompanyHistory";
import MeetOurTeam from "../../components/MeetOurTeam/MeetOurTeam";
import Introduction from "../../components/Introduction/Introduction";

const AboutPage = () => {
  return (
    <div className="about-page">
      <CompanyHistory />
      <Introduction />
      <MeetOurTeam />
    </div>
  );
};

export default AboutPage;
