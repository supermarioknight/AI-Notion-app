import React, { useReducer, useState, useContext, createContext } from "react";

export const BlockContext = createContext({children})
export const useBLocksAPI = () => useContext(BlockContext)

const initialState = {
    blocks: [],
    selectedBlock: null,
}

const blocksReducer = (state, action) => {

}

export default function BlockProvider() {


    return (
        <BlockContext.Provider
          value={{
            ...state,
            dispatch,

          }}
        >
          {children}
        </BlockContext.Provider>
      );
  }