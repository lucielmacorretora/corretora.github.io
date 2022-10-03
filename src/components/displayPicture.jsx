import React from "react";
import "./displayPicture.css";

function DisplayPicture({imgLink, containerClassName, imgClassName}){
    return (
        <div className={containerClassName}>
            <img className={"displayPictures " + imgClassName} id="displayPicture" src={imgLink} />
        </div>
    );
}

export default DisplayPicture;