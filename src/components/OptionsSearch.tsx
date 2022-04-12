import React, { FormEvent } from "react";

const OptionsSearch = () => {
  const optionInit = ["A", "B", "C", "D", "E"];
  const [search, SetSearch] = React.useState("");
  const [options, SetOptions] = React.useState(optionInit);
  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(JSON.stringify(e.currentTarget.value));
  };

  React.useEffect(() => {
    const optionsChange = setInterval(() => {
      const newOptions = [...options];
      if (newOptions.length > 1) {
        newOptions.push(newOptions.shift()!);
        SetOptions(newOptions);
      }
    }, 3000);
    console.log("options after ", options);
    return () => {
      clearInterval(optionsChange);
    };
  }, [options]);

  return (
    <>
      <form onSubmit={() => handleSubmit}>
        <br />
        <input
          type="text"
          id="search"
          name="search"
          value={search}
          onChange={(e) => SetSearch(e.target.value)}
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
