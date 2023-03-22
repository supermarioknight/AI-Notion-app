import React, { useRef, useState, useContext, createContext, useEffect }  from 'react'

export const WorkspacesContext = createContext()
export const useWorkspacesAPI = () => useContext(WorkspacesContext)

export default function WorkspacesProvider({children}) {
  

  return (
    <div>
      
    </div>
  )
}
