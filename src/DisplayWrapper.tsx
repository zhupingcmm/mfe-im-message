import React from "react";

export default function DisplayWrapper(props: any) {
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 48}}>{props.children}</div>
  )
}