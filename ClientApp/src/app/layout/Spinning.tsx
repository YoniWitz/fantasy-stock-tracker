import React from 'react'
import { Spinner } from 'react-bootstrap'

interface IProps {
  content?: string
}
export const Spinning: React.FC<IProps> = ({ content }) => {
  return (

    <div className="d-flex justify-content-center">
      <Spinner animation="border" role="status">
        <span>{content}</span>
      </Spinner>
    </div>

  )
}
