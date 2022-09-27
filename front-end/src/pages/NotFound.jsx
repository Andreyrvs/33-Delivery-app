import React from 'react';
import { Redirect } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="notFound">
      <Redirect to="/notFound" />
      <img src="../404.jpg" alt="not found" />
    </div>
  );
}
