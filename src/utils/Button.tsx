import React from "react";

export default function Button(props: buttonProps) {
    return (<button type={props.type} className={props.className}
        onClick={props.onClick} disabled={props.disabled} >{props.children}</button>);
}

interface buttonProps {
    children: React.ReactNode;
    className: string;
    onClick(): void;
    type: "button" | "submit";
    disabled: boolean;
}

Button.defaultProps = {
    className: 'btn btn-secondary',
    onClick: null,
    type: "button",
    disabled: false
}