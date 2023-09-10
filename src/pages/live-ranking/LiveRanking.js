import { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import { Heading } from '../../components/heading/Heading'
import './liveranking.scss'
const axios = require('axios');

const LiveRanking = () => {
    const [data, setData] = useState([])

//   const data = [
//     { id: 1, name: 'John', age: 30, points: 1000 },
//     { id: 2, name: 'Jane', age: 25, points: 1000 },
//     // Add more data here
//   ];

  function MyTable({ columns, data }) {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({
      columns,
      data,
    });

    return (
      <table
        {...getTableProps()}
        style={{
          border: '1px solid #ccc',
          width: '90%',
        }}
      >
        <thead
          style={{
            backgroundColor: '#008000'
          }}
        >
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: '2px solid #333',
                    padding: '8px',
                  }}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            const rowStyle = {
              backgroundColor: index % 2 === 0 ? '#fff' : '#f2f2f2',
            };

            prepareRow(row);

            return (
              <tr {...row.getRowProps()} style={rowStyle}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '8px',
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  const columns = [
    { Header: 'Rank', accessor: 'Rank' },
    { Header: 'Player', accessor: 'Name' },
    { Header: 'Age', accessor: 'Age' },
    { Header: 'Points', accessor: 'Points' },
    // Add more columns here
  ];

  async function getLiveRankings() {
    const options = {
      method: 'GET',
      url: 'https://ultimate-tennis1.p.rapidapi.com/rankings/atp/singles/50/current',
      headers: {
        'X-RapidAPI-Key': 'f9aa80a100mshd6542f0bd4ae698p1eb39djsnb64bb94f44b0',
        'X-RapidAPI-Host': 'ultimate-tennis1.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setData(response.data.data)
      console.log(response.data)
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getLiveRankings();
  }, []);

  return (
    <center>
      <Heading className="heading"> ATP Live Rankings </Heading>
      <MyTable columns={columns} data={data} />
    </center>
  );
};

export { LiveRanking };
