import { Link } from "react-router-dom";

type Props = {
  total: number;
  country: string;
};
const SearchResultInfo = ({ total, country }: Props) => {
  return (
    <div className="mt-4">
      <span>
        {total} Restaurant found in {country}
      </span>
      <Link
        to="/"
        className="ml-4 text-sm font-semibold underline text-blue-500 cursor-pointer"
      >
        Change Location
      </Link>
    </div>
  );
};

export default SearchResultInfo;
