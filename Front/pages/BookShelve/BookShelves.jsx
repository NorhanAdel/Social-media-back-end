import React, { useState } from "react";
import { Navdetils } from "../../Componenet";
import { useSelector } from "react-redux";
import "./styles.scss";

export const BookSelves = () => {
  const { user } = useSelector((state) => state.authentication);
  console.log(user)
  return (
    <>
      <div>
        <Navdetils />
        <div className="flex-container _container">
          <div className="sidebar">
            <h3>BookShelves</h3>
            <ul>
              <li>
                <a>All (356)</a>
              </li>
              <li>
                <a>Currently Reading (50)</a>
              </li>
              <li>
                <a>To Read (66)</a>
              </li>
              <li>
                <a>Never-finished(6)</a>
              </li>
              <li>
                <a className="bold">Add Shelf</a>
              </li>
              <li>
                <a>Owned Shelf</a>
              </li>
            </ul>
          </div>
          <div className="bookshelf">
            <div className="container">
              {user?.shelves.map((item, i) => (
                <div key={i} className="book-item">
                  <img src={item?.imageLinks?.thumbnail} alt="" />
                  <p>Book</p>
                </div>
              ))}
              <div className="book-item">
                <img
                  src="https://m.media-amazon.com/images/I/51zYFogJw3L._SY445_SX342_.jpg"
                  alt=""
                />
                <p>Book</p>
              </div>
              <div className="book-item">
                <img
                  src="https://m.media-amazon.com/images/I/51zYFogJw3L._SY445_SX342_.jpg"
                  alt=""
                />
                <p>Book</p>
              </div>
              <div className="book-item">
                <img
                  src="https://m.media-amazon.com/images/I/51zYFogJw3L._SY445_SX342_.jpg"
                  alt=""
                />
                <p>Book</p>
              </div>
              <div className="book-item">
                <img
                  src="https://m.media-amazon.com/images/I/51zYFogJw3L._SY445_SX342_.jpg"
                  alt=""
                />
                <p>Book</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
