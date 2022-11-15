import { LockOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input } from "antd";
import { useState } from "react";
import "./index.css";

function Search({ setFilters }) {
  const [desc, setDesc] = useState("");
  const [loc, setLoc] = useState("");
  const [isFullTime, setIsFullTime] = useState(false);

  const onSearch = () => {
    setFilters({ desc, loc, isFullTime });
  };
  return (
    <div className="App-Search">
      <div className="App-Search-input">
        <div className="App-label-search">Job Description</div>
        <Input
          placeholder="Filter by title, benefits, companies, expertise"
          prefix={<LockOutlined />}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <div className="App-Search-input">
        <div className="App-label-search">Location</div>
        <Input
          placeholder="Filter by title, benefits, companies, expertise"
          prefix={<LockOutlined />}
          onChange={(e) => setLoc(e.target.value)}
        />
      </div>
      <Checkbox onChange={(e) => setIsFullTime(e.target.value)}>
        Full Time Only
      </Checkbox>
      <Button onClick={onSearch}>Search</Button>
    </div>
  );
}

export default Search;
