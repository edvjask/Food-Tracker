import * as React from "react";
import { SearchInput } from "../SearchInput";
import { useEffect, useState } from "react";

export const DrinkSearchMain = ({}) => {
  const [searchInput, setSearchInput] = useState("");
  const [toggleSearch, setToggleSearch] = useState(false);

  useEffect(() => {
    //getDrinks
  }, [toggleSearch]);

  return (
    <>
      <SearchInput
        label={"Drink Search"}
        input={searchInput}
        setInput={setSearchInput}
        toggleSearch={setToggleSearch}
      />
      <div>Content</div>
    </>
  );
};
