import React from "react";
import "./Blog.scss";
import { Herobg } from "../../Componenet";
import IMG from "../../Assets/River-inspired Japanese library becomes a favorite meeting point for kids.jfif";
import { blogimg } from "../../Conestants";
import { BiSolidComment, BiSolidUser } from "react-icons/bi";
export const Blog = () => {
  return (
    <div className="blogpage">
      <Herobg
        title1="BOOKS & BLOG"
        title2="join us to read any type of book that you want"
        img={IMG}
        page="Blog"
      />
      <div className="blogs">
        <div className="blogs_container _container">
          <div className="blog">
            {blogimg.map((item, i) => {
              return (
                <div className="blogcard">
                  <div className="blogimg">
                    <img src={item} key={i} alt="blog" />
                  </div>
                  <div className="blogdesc">
                    <h3>design art</h3>
                    <h1>here each week my friends</h1>
                    <p className="blog-icon">
                      {" "}
                      <BiSolidUser /> <span>admin</span> / <BiSolidComment />{" "}
                      <span>Comment</span>
                    </p>
                    <p className="descblog">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dolor sapiente eligendi, animi corrupti consectetur nam
                      amet, beatae sequi incidunt sed, assumenda dolorum!
                    </p>
                    <button className="btn">Read More</button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="comment-form">
            <h1>Write your comment</h1>
            <span className="sub-heading"></span>
            <form>
              <div className="blogform">
                <input type="text" placeholder="Name" />
                <input type="text" placeholder="phone" />
                <input type="email" placeholder="email" />
              </div>
              <textarea row="10" cols="30" placeholder="blog msg"></textarea>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
