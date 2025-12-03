import React, { useState, useEffect } from "react";
import { Herobg, PostCard } from "../../Componenet";
import { createPost, getPosts } from "../../store/reducer/dataSlice";
import axios from "axios";
import "./Post.scss";
import { useDispatch, useSelector } from "react-redux";
import IMG from "../../Assets/River-inspired Japanese library becomes a favorite meeting point for kids.jfif";
import { BiUpload } from "react-icons/bi";
export const Post = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImages] = useState([]);
  const [authorId, seAuthorId] = useState([]);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authentication);
  const { posts } = useSelector((state) => state.data);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createPost({
        title,
        content,
        authorId: user?._id,
      })
    );
  };
  console.log(posts);
  const handleImageUpload = (event) => {
    const selectedImages = Array.from(event.target.files);
    setImages((prev) => [...prev, ...selectedImages]);
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div>
      <Herobg
        title1="post"
        title2="join us to read any type of book that you want"
        img={IMG}
        page="post"
      />
      <div className="post_container _container">
        <h1>people post</h1>
        <span className="sub-heading"></span>
        {!open && (
          <button className="btn" onClick={() => setOpen(true)}>
            Add Post
          </button>
        )}

        {open && (
          <div className="creatPost">
            <h1>Creat New Post</h1>
            <p>
              add the main post details hre. they 'll be connected to the layout
              and take on the layout design.
            </p>
            <form onSubmit={handleSubmit}>
              <label>post title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label>post content</label>
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />

              <div className="upload">
                <p>Post main image</p>
                <div className="upload_imag">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    id="image-upload-input"
                    onChange={handleImageUpload}
                  />
                  <BiUpload />
                  <p>image</p>
                </div>
                <div className="images">
                  {image.map((image, i) => (
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Car ${i + 1}`}
                      key={i}
                      className="rounded"
                    />
                  ))}
                </div>
              </div>
              <hr />
              <p>you can alwayes edit info later from the post settings </p>
              <div className="buttons">
                <button className="cancel" onClick={() => setOpen(false)}>
                  Cancel
                </button>
                <button className="start" type="submit">
                  Start
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="posts">
          {posts.map((post) => (
            <PostCard
              key={post._id}
              img={post.image}
              // name={post.author.username}
              desc={post.content}
            />
          ))}
          {/* <PostCard
            img={IMG}
            name="max redolf"
            desc="  hi ther 😊, Iam happy to share my book sit amet consectetur adipisicing elit. Incidunt, blanditiis accusantium eaque soluta, quis, iure cumque labore non esse reprehenderit sit quasi! Magni at minima aperiam fugiat id, possimus inventore. 😍😉✨👍 "
          />
          <PostCard
            img={IMG}
            name="nourhan Adel"
            desc="  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt, blanditiis accusantium eaque soluta, quis, iure cumque labore non esse reprehenderit sit quasi! Magni at minima aperiam fugiat id, possimus inventore. 😍😉✨👍 "
          /> */}
        </div>
      </div>
    </div>
  );
};
