import React from "react";
import { useState, useRef } from "react";
import UploadIcon from "@mui/icons-material/Upload";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Highlighter from "react-highlight-words";
import SearchIcon from "@mui/icons-material/Search";
const TextReader = () => {
  const [uploadText, setUploadText] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [checkSearch, setCheckSearch] = useState("");
  const [repeatNumber, setRepeatNumber] = useState(0);
  const inputSlide = useRef();
  const fileChange = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.readAsText(e.target.files[0]);
    reader.onload = (e) => {
      setUploadText(e.target.result);
    };
  };
  const onSearchChange = (event) => {
    setSearchValue(event.target.value);
  };
  return (
    <Container>
      {uploadText === "" && (
        <UploadContainer>
          <Title>Upload Text File(*supported formats : .txt)</Title>
          <div className="upload-icon">
            <input
              ref={inputSlide}
              type="file"
              onChange={fileChange}
              style={{ display: "none" }}
            />
            <UploadIcon
              style={{ height: "3rem", width: "3rem", cursor: "pointer" }}
              onClick={() => inputSlide.current && inputSlide.current.click()}
            />
          </div>
        </UploadContainer>
      )}
      {uploadText !== "" && (
        <ShowData>
          <SearchContainer>
            <TextField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              value={searchValue}
              onChange={onSearchChange}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  setCheckSearch(searchValue);
                  let temp = uploadText.split(searchValue);
                  setRepeatNumber(temp.length - 1 || 0);
                  return;
                }
                return;
              }}
            />
            <SearchIcon
              onClick={() => {
                setCheckSearch(searchValue);
                let temp = uploadText.split(searchValue);
                setRepeatNumber(temp.length - 1 || 0);
              }}
              className="search-icon"
            />
          </SearchContainer>
          <Title>Text Data</Title>
          {checkSearch !== "" && (
            <div className="occurences">Total Occurences = {repeatNumber}</div>
          )}
          <Highlighter
            highlightClassName="highlightClass"
            searchWords={[checkSearch]}
            autoEscape={true}
            textToHighlight={uploadText}
          />
        </ShowData>
      )}
    </Container>
  );
};
export default TextReader;
const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 2rem 2rem;
  background-color: #f0f0f0;
`;
const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;
const UploadContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .upload-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const ShowData = styled.div`
  .occurences {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  .highlightClass {
    background-color: aqua;
  }
`;
const SearchContainer = styled.div`
  max-width: 15rem;
  margin: 1rem 0 3rem 0;
  position: relative;
  .MuiOutlinedInput-input {
    width: calc(100% - 3.5rem);
  }
  display: flex;
  align-items: center;
  .search-icon {
    position: absolute;
    right: 1.5rem;
    z-index: 10;
    height: 100%;
    cursor: pointer;
  }
`;
