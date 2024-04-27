import { useGetRestaurantsQuery } from "@/app/api/restaurantApiSlice";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDropDown from "@/components/SortOptionDropDown";
import { Restaurant } from "@/types";
import { useState } from "react";
import { useParams } from "react-router-dom";
type SearchState = {
  searchQuery: string;
  selectedCuisines: string[];
  sortOption: string;
  page: number;
};
const SearchPage = () => {
  const { country } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    selectedCuisines: [],
    sortOption: "Best match",
    page: 1,
  });
  const constructFilterLink = (state: SearchState) => {
    let filterLink = "";
    if (state.searchQuery) {
      filterLink += `searchQuery=${state.searchQuery}&`;
    }
    if (state.selectedCuisines.length !== 0) {
      filterLink += `cuisines=${state.selectedCuisines.join(",")}&`;
    }
    if (state.sortOption && state.sortOption !== "Best match") {
      filterLink += `sortOption=${state.sortOption}&`;
    }
    if (state.page) {
      filterLink += `page=${state.page}`;
    }
    return filterLink;
  };
  const { data } = useGetRestaurantsQuery({
    link: constructFilterLink(searchState),
    country,
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const onExpandedClick = () => {
    setIsExpanded(() => !isExpanded);
  };

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
    }));
  };
  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
    }));
  };

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
    }));
  };
  console.log(searchState);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisin-list">
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={onExpandedClick}
        />
      </div>
      <div
        id="main-content"
        className="flex flex-col gap-3 "
      >
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          onReset={resetSearch}
          placeHolder="Search by Cuisine or Restaurant Name"
        />
        <div className="text-xl font-bold flex flex-col justify-between lg:flex-row lg:items-center gap-3">
          <SearchResultInfo
            total={data?.meta?.total}
            country={country ? country : ""}
          />

          <SortOptionDropDown
            sortOption={searchState.sortOption}
            onChange={setSortOption}
          />
        </div>
        {data?.restaurants?.map((restaurant, index) => (
          <SearchResultCard
            key={index}
            restaurant={restaurant ? restaurant : ({} as Restaurant)}
          />
        ))}

        <PaginationSelector
          page={data?.meta?.page}
          pages={data?.meta?.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default SearchPage;
