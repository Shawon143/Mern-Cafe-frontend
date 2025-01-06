import React from "react";

const UnauthorizedPage = () => {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold text-red-500">Unauthorized</h1>
      <p className="text-gray-700 mt-4">
        You do not have permission to access this page.
      </p>
    </div>
  );
};

export default UnauthorizedPage;
