import React, { useReducer, useState } from "react";
import axios from "axios";
const initialState = { isLoading: false, isErr: false, Todo: [] };

const constants = {
  ADD_REQUEST: "ADD_REQUEST",
  ADD_SUCCESS: "ADD_SUCCESS",
  ADD_FAILURE: "ADD_FAILURE",
  GET_REQUEST: "GET_REQUEST",
  GET_SUCCESS: "GET_SUCCESS",
  GET_FAILURE: "GET_FAILURE"
};
const reducer = (state, action) => {
  switch (action.type) {
    case constants.ADD_REQUEST:
      return { ...state, isLoading: true };
    case constants.ADD_SUCCESS:
      return { ...state, isLoading: false, isErr: false };
    case constants.ADD_FAILURE:
      return {
        ...state,
        isLoading: false,
        isErr: true,
        errMsg: action.payload
      };
    default:
      return { state };
  }
};
export const Todo = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  const insit = {
    title: "",
    status: false
  };
  const [text, setText] = useState(insit);
  const handlechange = (e) => {
    const payload = {
      title: e.target.value,
      status: false
    };
    setText({ ...payload });
  };

  const handleSubmit = () => {
    dispatch({ type: constants.ADD_REQUEST });
    axios
      .post("http://127.0.0.1:3001/todos", text)
      .then((res) => {
        setText(insit);
      })
      .catch((err) => {});
  };
  return (
    <>
      <h1>Todo List</h1>
      <input
        type="text"
        onChange={handlechange}
        placeholder="Enter the Todo Title"
        value={text.title}
      />
      <button onClick={handleSubmit}>Add Todo</button>
      <div>
        <h1>Todo List</h1>
        <h1>Loading.....</h1>
        {/* {state.Todo === "" ? <h1>No data avaliable</h1> : <h2>data</h2>} */}
      </div>
    </>
  );
};
