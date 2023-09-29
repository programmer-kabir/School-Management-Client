import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  return (
    <div className={`flex w-full bg-white p-1 rounded-lg`}>
      <input
        placeholder="Email address"
        type="email"
        value={email}
        className="input  bg-transparent text-gray-600 px-2 rounded-none w-full focus:outline-0"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className={` px-5 py-2 bg-cyan-600 hover:bg-green-dark-jungle text-white text-xs border-transparent rounded-lg normal-case`}
      >
        Subscribe
      </button>
    </div>
  );
};

export default Newsletter;