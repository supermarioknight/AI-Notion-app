import React, {useState} from 'react'

export default function TextBlock() {
  const [text, setText] = useState("")

  const handleChange = (event) => {
    setText(event.target.value);
  }

  return (
    <div>
        <textarea value={text} onChange={handleChange} />
    </div>
  )
}
