import React from 'react'

function UserProfile() {
  return (
  <div className="bg-gray-100 sm:p-4 md:p-8 md:max-w-sm md:max-w-xs mx-auto my-20 rounded-lg shadow-lg hover:shadow-xl">
      <img src="https://via.placeholder.com/150" alt="User" className="rounded-full sm:w-24 sm:h-24 md:w-36 md:h-36 mx-auto hover:scale-110 transition-transform duration-300 ease-in-out"/>
      <h1 className="text-lg md:text-xl text-blue-800 my-4 hover:text-blue-500" >John Doe</h1>
      <p className="text-sm md:text-base text-gray-600 text"> Developer at Example Co. Loves to write code and explore new technologies. </p>
    </div>
  )
}

export default UserProfile;
