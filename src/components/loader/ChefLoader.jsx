import React from "react";
import "./ChefLoader.css"; // Import your custom styles

export default function ChefLoader() {
  return (
    <div className="chef-spinner-wrapper">
      <div className="chef-hat">👨‍🍳</div>
      <p className="chefyPrepareText">Chefy is preparing your recipe...</p>
    </div>
  );
}
