import { useState, useEffect } from "react";
import axios from "axios";

function Books() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get("http://localhost:5000/api/books");
      setBooks(response.data);
    };
    fetchBooks();
  }, []);

  const addBook = async () => {
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:5000/api/books",
      { title, author, genre },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setBooks([...books, { title, author, genre }]);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <button onClick={addBook}>Add Book</button>
      <ul>
        {books.map((book, index) => (
          <li key={index}>
            {book.title} by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Books;
