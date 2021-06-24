import { useEffect, useState } from "react";
import "./App.css";

function Button(props) {
  console.count("render button");
  return <button {...props} style={{ backgroundColor: "lightgray" }} />;
}

function ListItem({ children }) {
  console.count("render list item");
  return (
    <li>
      {children}
      <label style={{ fontSize: "smaller" }}>
        <input type="checkbox" />
        Add to cart
      </label>
    </li>
  );
}

function App() {
  const [searchString, setSearchString] = useState("");
  const [isSortingDesc, setSortingDesc] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.count("render fetch");
    fetch("https://reqres.in/api/products")
      .then((response) => response.json())
      .then((json) =>
        setProducts(
          json.data
            .filter((item) => item.name.includes(searchString))
            .sort((a, z) =>
              isSortingDesc
                ? z.name.localeCompare(a.name)
                : a.name.localeCompare(z.name)
            )
        )
      );
  }, [searchString, isSortingDesc]);

  console.count("render app");

  return (
    <div className="App">
      <input
        type="search"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
      <Button onClick={() => setSortingDesc((value) => !value)}>
        Change sort direction
      </Button>
      <ul>
        {products.map((product) => {
          return <ListItem>{product.name}</ListItem>;
        })}
      </ul>
    </div>
  );
}

export default App;
