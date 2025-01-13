import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati
            quo aut ipsam fugiat magni velit? Officia veniam, tenetur voluptatem
            qui incidunt repellat fugit dolores ad ex facere ipsam optio
            delectus, dicta alias illum officiis voluptatibus! Exercitationem
            doloremque laudantium quod aliquam cupiditate error est quia sint!
            Ducimus facilis officiis quod ad!
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+237 677583458</li>
                <li>tomato@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright"> Copyright 2024 &copy; All Rights Reserved</p>
    </div>
  );
}

export default Footer;
