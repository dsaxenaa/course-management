import React from 'react';

// footer for the app
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex flex-col items-center">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Contact Us</h2>
          <p>Email: contact@gmail.com</p>
          <p>Phone: +91 123-456-7890</p>
        </div>
        <div>
          <p>&copy; 2023 My Courses App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
