import React, { FormEvent } from "react";
import agent from "../api/agent";
import { ApiResponse } from "../models/ApiResponse";

const OptionsSearch = () => {
  const optionInit = ["A", "B", "C", "D", "E"];
  const [search, SetSearch] = React.useState("");
  const [options, SetOptions] = React.useState(optionInit);
  const [searchResult, SetSearchResult]= React.useState<string[]>([]);

  const handleSearchChange = async (e: FormEvent<HTMLInputElement>)=>{
    e.preventDefault();
    SetSearch(e.currentTarget.value);
    const result = await agent.SearchResult.get<ApiResponse>(search);
    const searchResults = result.results;
    if(searchResults.length > 1){
      const collectionNames = searchResults.map((item)=> (item.collectionName)).sort().slice(0,5);
      SetSearchResult(collectionNames);
      console.log(JSON.stringify(searchResult,null,2))
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  React.useEffect(() => {
    const optionsChange = setInterval(() => {
      const newOptions = [...options];
      
      if(searchResult.length > 1){
        newOptions.push(newOptions.shift()!);
        SetOptions(searchResult);
      }else{
        if (newOptions.length > 1) {
          newOptions.push(newOptions.shift()!);
          SetOptions(newOptions);
        }
      }
    }, 3000);
    return () => {
      clearInterval(optionsChange);
    };
  }, [options, searchResult]);

  return (
    <>
      <form onSubmit={ handleSubmit}>
        <br />
        <input
          type="text"
          id="search"
          name="search"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search item"
        />
        <br />
        {options.map((o, i) => {
          return (
            <span
              key={i}
              style={{
                width: "50%",
                margin: " 0.5em auto",
                textAlign: "center",
                border: "1px solid gray",
              }}
            >
              {o}
            </span>
          );
        })}
      </form>
    </>
  );
};

export default OptionsSearch;
