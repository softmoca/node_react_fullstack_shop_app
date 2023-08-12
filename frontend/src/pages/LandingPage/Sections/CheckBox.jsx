import React from "react";

export default function CheckBox({ continents, checkedContinents, onFilters }) {
  const handleToggle = (continentId) => {
    // 현재 누른 checkbox가 이미 누른 checkbox 인지 체크
    const currentIndex = checkedContinents.indexOf(continentId); // 이미 눌러진것들

    const newChecked = [...checkedContinents];

    if (currentIndex === -1) {
      // 없으니깐 새로 넣어준다
      newChecked.push(continentId);
    } else {
      newChecked.splice(currentIndex, 1); // 있으면 splice로 제거
    }
    onFilters(newChecked);
  };

  return (
    <div className="p-2 mb-3 bg-gray-100 rounded-md">
      {continents?.map((continent) => (
        <div key={continent._id}>
          <input
            type="checkbox"
            onChange={() => handleToggle(continent._id)}
            checked={
              //더 확실하게 체크 한지 확인
              checkedContinents.indexOf(continent._id) === -1 ? false : true
            }
          />{" "}
          <label>{continent.name}</label>
        </div>
      ))}
    </div>
  );
}
