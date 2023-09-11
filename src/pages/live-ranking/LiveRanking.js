import { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import { Heading } from '../../components/heading/Heading'
import Modal from '../../components/modal/Modal'
import './liveranking.scss'

var AWS = require('aws-sdk');

const LiveRanking = () => {
  const [data, setData] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null); // State to track the selected player
  const [isOpen, setIsOpen] = useState(true); // State to track the modal's visibility

  const accessKeyId = process.env.REACT_APP_ACCESS_KEY_ID.replace(/['"]+/g, '');
  const secretAccessKey = process.env.REACT_APP_SECRET_ACCESS_KEY.replace(/['"]+/g, '');
  AWS.config.update({ accessKeyId: accessKeyId, secretAccessKey: secretAccessKey });
  AWS.config.update({ region: 'us-east-1' });

 
  function MyTable({ columns, data, onRowClick }) {
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
            backgroundColor: '#008000',
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
              cursor: 'pointer', // Add this line to make the row clickable
            };

            prepareRow(row);

            return (
              <tr
                {...row.getRowProps()}
                style={rowStyle}
                onClick={() => onRowClick(row.original.Name)} // Pass the player's name when row is clicked
              >
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
    var lambda = new AWS.Lambda()
    var params = {
      FunctionName: 'LiveRanking-staging'
    }

    lambda.invoke(params, (err, data) => {
      if (err) {
        console.log(err)
      } else {
        const body = JSON.parse(data.Payload)
        setData(body.data)
      }
    });
  }

  useEffect(() => {
    getLiveRankings();
  }, []);

  return (
    <center>
      <Heading className="heading">ATP Live Rankings</Heading>
      {data && (
        <>
          <MyTable columns={columns} data={data} onRowClick={() => {setIsOpen(true)}} />
        </>
      )}
      {isOpen && <Modal setIsOpen={setIsOpen} playerId={selectedPlayer} />}
    </center>
  );
};

export { LiveRanking };