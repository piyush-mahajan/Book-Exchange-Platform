import { useState, useEffect } from "react";
import axios from "axios";

function Matchmaking() {
  const [books, setBooks] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get("http://localhost:5000/api/books");
      setBooks(response.data);
    };
    fetchBooks();
  }, []);

  const findMatches = () => {
    const userId = localStorage.getItem("userId"); // Get the current user's ID
    const userBooks = books.filter((book) => book.userId === userId); // Filter books by current user ID
    const matchedBooks = books.filter((book) =>
      userBooks.some((ub) => ub.genre === book.genre)
    );
    setMatches(matchedBooks);
  };

  return (
    <div>
      <button onClick={findMatches}>Find Matches</button>
      <ul>
        {matches.map((match, index) => (
          <li key={index}>
            {match.title} by {match.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Matchmaking;
