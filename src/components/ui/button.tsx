import React from "react"

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => {
  return (
    <button {...props} className="btn">
      {children}
    </button>
  )
}
