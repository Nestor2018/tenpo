import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { fetchPosts } from "../services/api";
import { RootState } from "../store";
import "./Home.scss";

interface Post {
  id: number;
  title: string;
  body: string;
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 10; // Elementos por página
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const loadInitialPosts = async () => {
      const { posts: initialPosts, total: totalPosts } = await fetchPosts(
        1,
        pageSize,
      );
      setPosts(initialPosts);
      setTotal(totalPosts);
    };
    loadInitialPosts();
  }, [token]);

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    const { posts: newPosts } = await fetchPosts(nextPage, pageSize);
    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    setPage(nextPage);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const hasMore = posts.length < total;

  return (
    <div className="home-container">
      <div className="header">
        <h1>Home</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="load-more-container">
          <button onClick={handleLoadMore} className="load-more-btn">
            Cargar más
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
