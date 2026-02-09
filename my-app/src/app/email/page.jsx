import React from 'react'
import { sendEmailClient } from './actions'

const page = () => {
  return (
    <div>
        <form action={sendEmailClient}>
            <input type="email" name="email"  />
            <button>Send email</button>
        </form>
    </div>
  )
}

export default page
