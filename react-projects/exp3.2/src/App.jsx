import { useState } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([
    { title: "1984", author: "George Orwell" },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { title: "To Kill a Mockingbird", author: "Harper Lee" },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [search, setSearch] = useState("");

  // Add book
  const addBook = () => {
    if (newTitle.trim() === "" || newAuthor.trim() === "") return;
    setBooks([...books, { title: newTitle, author: newAuthor }]);
    setNewTitle("");
    setNewAuthor("");
  };

  // Remove book
  const removeBook = (index) => {
    const updatedBooks = books.filter((_, i) => i !== index);
    setBooks(updatedBooks);
  };

  // Filter books
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="library-container">
      <h2>Library Management</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by title or author"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {/* Add book */}
      <div className="add-book">
        <input
          type="text"
          placeholder="New book title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="New book author"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
        />
        <button onClick={addBook}>Add Book</button>
      </div>

      {/* Book list */}
      <ul className="book-list">
        {filteredBooks.map((book, index) => (
          <li key={index}>
            <span>
              <strong>{book.title}</strong> by {book.author}
            </span>
            <button onClick={() => removeBook(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
