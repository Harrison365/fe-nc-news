import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchArticle, patchVote } from "../Fetch/api";
// import Heart from "react-animated-heart";
import "../App.css";
import LikeButton from "./LikeButton";
import CommentList from "./CommentList";

export default function IndividualArticle(props) {
  const params = useParams(); //grabs parameter from end of string

  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClick, setClick] = useState(false);
  const [likes, setLikes] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticle(params.article_id)
      .then((article) => {
        setArticle(article);
        setIsLoading(false);
        setLikes(article.votes);
        setError(null);
      })
      .catch(
        ({
          response: {
            data: { msg },
            status,
          },
        }) => {
          setError({ msg, status });
          setIsLoading(false);
        }
      );
  }, []);

  if (isLoading) return <p>Loading Articles ...</p>;
  if (error)
    return (
      <h2>
        {error.status}:{error.msg}
      </h2>
    );
  return (
    <div>
      <div id="individualArticle">
        <h2>{article.title}</h2>
        <h4 id="article_details">
          by {article.author} ({article.created_at[8]}
          {article.created_at[9]}-{article.created_at[5]}
          {article.created_at[6]}-{article.created_at[0]}
          {article.created_at[1]}
          {article.created_at[2]}
          {article.created_at[3]}, {article.created_at[11]}
          {article.created_at[12]}
          {article.created_at[13]}
          {article.created_at[14]}
          {article.created_at[15]})
        </h4>
        Likes {likes}:
        <LikeButton
          setClick={setClick}
          patchVote={patchVote}
          isClick={isClick}
          setLikes={setLikes}
          params={params}
        />
        <p id="articleBody">{article.body}</p>
      </div>
      <CommentList article_id={params.article_id} />
    </div>
  );
}

//optimistic rendering is when we increase the likes in a hardcoded way but the actual patch will be done the next time the page is rendered (avoiding the need to rerender to update the likes etc. on screen.)
