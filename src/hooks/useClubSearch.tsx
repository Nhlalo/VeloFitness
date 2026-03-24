import { useState, useMemo, ChangeEvent, useRef } from "react";
import { Gym } from "../types/club.interface";
import debounce from "../utils/debounce";

export default function useClubSearch(
  setIsClubClicked?: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const [inputValue, setInputValue] = useState<string>("");
  const [clubs, setClubs] = useState<Gym[] | []>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  // Debounce input changes by 300ms to prevent excessive rerendering
  const debouncedSetInput = useMemo(
    () =>
      debounce((value: string) => {
        setInputValue(value);
      }, 300),
    [],
  );

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    debouncedSetInput(value);
  }

  //This will be passed to the Result component so that when the result of the input search is pressed it can affect this component by causing rerendering.
  function adjustClubData(data: Gym[]) {
    console.log("setIsClubClicked in hook:", setIsClubClicked);
    if (setIsClubClicked) {
      setIsClubClicked(true);
    }
    setClubs(data);
    setInputValue("");

    //Clear the input search after button click
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return {
    handleChange,
    adjustClubData,
    inputValue,
    clubs,
    setClubs,
    inputRef,
  };
}
