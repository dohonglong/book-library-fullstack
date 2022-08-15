import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";

// import { logout } from "../redux/auth/actions";
// import { BookDocument } from "../redux/auth/actions";

function Home() {
  const [books, setBooks] = useState([]);
  const fetchBooks = async () => {
    const res = await axios.get("/book");
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);
  // const [books, setBooks] = useState<BookDocument[]>([]);
  // const dispatch = useDispatch();

  // const fetchBooks = async () => {
  //   const res = await axios.get("/book");
  //   setBooks(res.data);
  // };

  // const handleLogout = () => {
  //   dispatch(logout());
  //   localStorage.removeItem("access_token");
  // };

  // useEffect(() => {
  //   fetchBooks();
  // }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/login">Login with google</Link>
      {/* <Link to='/profile'>Profile</Link>
      <button onClick={handleLogout}>Log out</button>
      <div
        style={{
	@@ -46,9 +46,9 @@ function Home() {
            </div>
          )
        })}
      </div> */}
    </div>
  );
}

export default Home;
