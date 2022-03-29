import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { fetchArticlesByTopic } from "../Fetch/api";
import { useParams } from "react-router-dom";
import SortBy from "./SortBy";
import Order from "./Order";
import "../App.css";

export default function ArticleTopics({ sortBy, setSortBy, order, setOrder }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { topic } = useParams();
  const topicHeading = topic.charAt(0).toUpperCase() + topic.slice(1);

  useEffect(() => {
    fetchArticlesByTopic(topic, sortBy, order)
      .then((articles) => {
        setArticles(articles);
        setIsLoading(false);
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
  }, [topic, sortBy, order]);
  if (isLoading) return <p>Loading Articles ...</p>;
  if (error)
    return (
      <h2>
        {error.status}:{error.msg}
      </h2>
    );
  return (
    <div id="sortAndOrder">
      Sort Articles By:
      <SortBy sortBy={sortBy} setSortBy={setSortBy} />
      Order:
      <Order order={order} setOrder={setOrder} />
      <section className="ArticleList">
        <h2>{topicHeading} Articles</h2>
        {articles.map((article) => {
          return <ArticleCard key={article.article_id} article={article} />;
        })}
      </section>
    </div>
  );
}
