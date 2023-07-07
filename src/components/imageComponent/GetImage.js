import React from "react";

function GetImage(props) {
    return(
        <>
            <img alt={props.alt}
                 className= {props.className}
                 src={props.src}
            />
        </>
    )
}

export default GetImage;