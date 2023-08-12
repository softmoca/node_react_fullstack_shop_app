import React, { useEffect, useState } from "react";
import CheckBox from "./Sections/CheckBox";
import RadioBox from "./Sections/RadioBox";
import SearchInput from "./Sections/SearchInput";
import CardItem from "./Sections/CardItem";
import axiosInstance from "../../utils/axios";
import { continents, prices } from "../../utils/filterData";

export default function LandingPage() {
  const limit = 4; // 더 보기 버튼을 눌렀을 때 몇개의 사진을 더 보여줄지
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0); // 처음에는 모든걸 가져와야하니 0으로 시작하고 그다음엔 +limit
  const [hasMore, setHasMore] = useState(false); // 더 가져올 데이터가 있는지 hasMore이 있을 때만 더보기 가능
  const [filters, setFilters] = useState({
    continents: [], // 각각의 인덱스가 들어간다
    price: [], // filters['continents]와 filters['price']
  });

  useEffect(() => {
    // 처음 화면에 보여줄 상품들(몽고 DB에 있는데이터)를 가져온다
    fetchProducts({ skip, limit });
  }, []); // 의존성 배열에 빈 배열을 넣으면 처음 렌더링시에만 가져온다

  const fetchProducts = async ({
    skip,
    limit,
    loadMore = false,
    filters = {},
    searchTerm = "",
  }) => {
    const params = {
      //   객체 생성
      skip: skip,
      limit: limit,
      filters: filters, //  디폴트 값 O
      searchTerm: searchTerm, // 디폴트 값 O
    };

    try {
      const response = await axiosInstance.get("/products", { params }); // 백엔드에 데이터 요청

      if (loadMore) {
        setProducts([...products, ...response.data.products]); //  받아온 데이터를 추가
      } else {
        setProducts(response.data.products);
      }
      setHasMore(response.data.hasMore);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoadMore = () => {
    const body = {
      skip: skip + limit,
      limit,
      loadMore: true,
      filters,
      // searchTerm,
    };
    fetchProducts(body);
    setSkip(skip + limit);
  };

  //newFilteredData는 체크된 인덱스들    category는 continents랑 price
  const handleFilters = (newFilteredData, category) => {
    const newFilters = { ...filters }; // state의 ilters['continents]와 filters['price']
    newFilters[category] = newFilteredData;
    if (category === "price") {
      const priceValues = handlePrice(newFilteredData); // 인덱스가 들어와어 array 범위가 나옴
      newFilters[category] = priceValues; //priceValues는 [200,299]이런 식으로 된다.
    }
    showFilteredResults(newFilters); // 필터링 된걸 이용해서 백엔드에게 요청을 보냄
    setFilters(newFilters); // 변경된 인덱스들로 수정
  };

  const handlePrice = (value) => {
    let array = [];

    for (let key in prices) {
      if (prices[key]._id === parseInt(value, 10)) {
        array = prices[key].array; //[200,299] 이런식
      }
    }
    return array;
  };

  const showFilteredResults = (filters) => {
    // 필터링 된걸 이용해서 백엔드에게 요청을 보냄
    console.log(filters);
    const body = {
      skip: 0, // 필터를 거치면 처음부터 다시 상품들을 생성
      limit,
      filters, // 체크된 사로운 인덱스들
    };

    fetchProducts(body); //백엔드로 요청
    setSkip(0);
  };

  return (
    <section>
      <div className="text-center m-7">
        <h2 className="text-2xl">여행 상품 사이트</h2>
      </div>
      {/* Filter */}
      <div className="flex gap-3">
        <div className="w-1/2">
          <CheckBox
            continents={continents}
            checkedContinents={filters.continents}
            onFilters={(filters) => handleFilters(filters, "continents")}
          />
        </div>
        <div className="w-1/2">
          <RadioBox
            prices={prices}
            checkedPrice={filters.price}
            onFilters={(filters) => handleFilters(filters, "price")}
          />
        </div>
      </div>

      {/* Search */}
      <div className="flex justify-end mb-3">
        <SearchInput />
      </div>

      {/* Card           // 화면 크기에 따라 보여줄 카드 개수 변경의 위함 grid*/}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {products.map((product) => (
          <CardItem product={product} key={product._id} />
        ))}
      </div>

      {/* LoadMore 더보기  */}

      {hasMore && (
        <div className="flex justify-center mt-5">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 mt-5 text-white bg-black rounded-md hover:bg-gray-500"
          >
            더 보기
          </button>
        </div>
      )}
    </section>
  );
}
