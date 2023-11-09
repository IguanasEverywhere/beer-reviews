import React, { useEffect } from "react";

function Logout() {

  useEffect(() => {
    fetch('/api/logout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((r) => console.log(r))
  })

  return (
    <div>
      See you next time!
    </div>
  )
}

export default Logout;