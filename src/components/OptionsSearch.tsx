import React, { FormEvent } from "react";
import agent from "../api/agent";
import { ApiResponse } from "../models/ApiResponse";

const OptionsSearch = () => {
  const optionInit = ["A", "B", "C", "D", "E"];
  const [search, SetSearch] = React.useState("");
  const [options, SetOptions] = React.useState(optionInit);
  const [index, SetIndex] = React.useState(0);
  const [searchResult, SetSearchResult] = React.useState<string[]>([]);

  const handleSearchChange = async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    SetSearch(e.currentTarget.value);
    let result: ApiResponse = {resultCount:0, results:[]};
    try{result = await agent.SearchResult.get<ApiResponse>(search);}catch{}
    const searchResults = result.results;
    if (searchResults.length > 1) {
      const collectionNames = searchResults
        .map((item) => item.collectionName)
        .sort()
        .slice(0, 5);
      SetSearchResult(collectionNames);
      console.log("Returned resp >> ", JSON.stringify(searchResult, null, 2));
    }
  };

  React.useEffect(() => {
    const optionsChange = setInterval(() => {
      let newOptions = [...options];

      if (searchResult.length > 1) {
        console.log("Search result for replacement ", searchResult);

        newOptions.shift()!;

        newOptions.push(searchResult[index]);

        SetOptions(newOptions);

        const indexValue = index < searchResult.length - 1 ? index + 1 : 0;
        console.log("INdex Value is ", indexValue);
        SetIndex(indexValue);
      } else {
        if (newOptions.length > 1) {
          newOptions.push(newOptions.shift()!);
          SetOptions(newOptions);
        }
      }
    }, 1000);
    return () => {
      clearInterval(optionsChange);
    };
  }, [index, options, searchResult]);

  return (
    <>
      <div
        style={{
          width: "70%",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <br />
        <input
          type="text"
          id="search"
          name="search"
          value={search}
          onChange={handleSearchChange}
          onBlur={handleSearchChange}
          placeholder="Search Band"
          style={{ width: "100%" }}
        />
        <br />
        {options.map((o, i) => {
          return (
            <div
              key={i}
              style={{
                width: "100%",
                margin: " 0.5em auto",
                textAlign: "center",
                border: "1px solid gray",
              }}
            >
              {o}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default OptionsSearch;
