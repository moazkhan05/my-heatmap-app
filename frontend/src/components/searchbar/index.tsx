import { HTMLAttributes } from "react";

export interface SearchBarProps extends HTMLAttributes<HTMLInputElement> {}
export default function SearchBar({ ...props }: SearchBarProps) {
  return (
    <div className="flex flex-col">
      <label>Search</label>
      <input {...props} />
    </div>
  );
}
