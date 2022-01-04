const Table = ({ data }: any) => {
  const firstEntry = data[0];
  const categoryList = Object.keys(firstEntry);
  const titleList = ["title", "titulo"];

  const valueList = data.map((value: any) => {
    const values = Object.values(value).filter(
      (value) => typeof value === "string" && !titleList.includes(value)
    );

    return values;
  });

  return (
    <table className="text-left table-fixed capitalize border border-secondary">
      {categoryList && (
        <thead>
          <tr className="md:flex">
            {categoryList?.map((category: any, categoryIndex: number) => {
              return (
                <th key={categoryIndex} className="md:w-full p-5 text-primary">
                  {category}
                </th>
              );
            })}
          </tr>
        </thead>
      )}
      <tbody>
        {valueList?.map((valueList: any, index: number) => (
          <tr key={index} className="md:flex w-full no-wrap">
            {valueList.map((value: any, valueIndex: number) => (
              <td
                key={valueIndex}
                className={`md:w-full p-5 tracking-wider ${
                  valueIndex === 0 ? "font-bold" : ""
                }`}
              >
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
