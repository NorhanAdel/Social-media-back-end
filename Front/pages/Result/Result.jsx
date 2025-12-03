import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import "./Result.scss";
import { searchbook } from "../../store/reducer/dataSlice";
import { Navdetils, Rating } from "../../Componenet";
import { BiDownload } from "react-icons/bi";
import { Link } from "react-router-dom";
 
export const Result = () => {
  const { title } = useParams();
  const dispatch = useDispatch();
  const { searchResult } = useSelector((state) => state.data);
useEffect(() => {
  dispatch(searchbook(title));
  return () => {};
}, [title, dispatch]);
  console.log(searchResult);

  return (
    <div>
      <Navdetils />
      <div className="resultpage _container">
        <h1>Results of Search</h1>
        <span className="sub-heading"></span>
        <div className="bookscard">
          {searchResult.map((book) => {
            return (
              <Link
              to={`/book-details/${encodeURIComponent(
                  book.id
                )}`}
                key={book.id}
              >
                <div className="bookcard">
                  <img
                    src={book.volumeInfo.imageLinks?.thumbnail}
                    alt={book.volumeInfo.title}
                  />
                  <h3>{book.volumeInfo.title}</h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
