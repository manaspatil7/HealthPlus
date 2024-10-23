import React from "react";
import profile1 from "../Assets/profile-1.png";
import profile2 from "../Assets/profile-2.png";
import profile3 from "../Assets/profile-3.png";
import profile4 from "../Assets/profile-4.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "../Styles/Doctors.css";

function Doctors() {
  const doctors = [
    {
      id: 1, // Adding unique ID for better key usage
      img: profile1,
      name: "Dr. Kathryn Murphy",
      title: "General Surgeon",
      stars: "4.9",
      reviews: "1800",
    },
    {
      id: 2,
      img: profile2,
      name: "Dr. Jacob Jones",
      title: "Hematologist",
      stars: "4.8",
      reviews: "700",
    },
    {
      id: 3,
      img: profile3,
      name: "Dr. Jenny Wilson",
      title: "Endocrinologist",
      stars: "4.7",
      reviews: "450",
    },
    {
      id: 4,
      img: profile4,
      name: "Dr. Albert Flores",
      title: "Hematologist",
      stars: "4.8",
      reviews: "500",
    },
  ];

  return (
    <div className="doctor-section" id="doctors">
      <div className="dt-title-content">
        <h3 className="dt-title">
          <span>Meet Our Doctors</span>
        </h3>
        <p className="dt-description">
          Meet our exceptional team of specialist doctors, dedicated to
          providing top-notch healthcare services at Health Plus. Trust in their
          knowledge and experience to lead you towards a healthier and happier
          life.
        </p>
      </div>

      <div className="dt-cards-content">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="dt-card">
            <img src={doctor.img} alt={doctor.name} className="dt-card-img" />
            <p className="dt-card-name">{doctor.name}</p>
            <p className="dt-card-title">{doctor.title}</p>
            <p className="dt-card-stars">
              <FontAwesomeIcon
                icon={faStar}
                style={{ color: "#F7BB50", paddingRight: "6px" }}
              />
              {doctor.stars}
              <span className="dt-card-reviews"> ({doctor.reviews}+ Reviews)</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Doctors;
