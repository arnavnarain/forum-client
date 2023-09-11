import React from 'react';
import { useTable } from 'react-table';

const GameProgressTable = (props) => {
    const { tournamentTitle, surface, players, score } = props;

    const isInteger = (value) => {
        return value !== 'None'
    };
    const integerCount = score.filter(isInteger).length;
    console.log(integerCount)
    console.log(score)
    // Data for the top and bottom tables
    const topTableData = React.useMemo(
        () => [
            {
                column1: 'Tournament: ' + tournamentTitle,
            },
            {
                column1: 'Surface: ' + surface,
            },
        ],
        []
    );

    const bottomTableData = React.useMemo(
        () => [
            {
                column1: players[0],
                column2: score[0],
                column3: score[2],
                column4: score[4],
            },
            {
                column1: players[1],
                column2: score[1],
                column3: score[3],
                column4: score[5]
            },
        ],
        []
    );

    // Define columns for both tables
    const topTableColumns = React.useMemo(
        () => [
            {
                Header: 'Column 1',
                accessor: 'column1', // accessor is the "key" in the data
            },
        ],
        []
    );

    const bottomTableColumns = React.useMemo(
        () => [
            {
                Header: 'Column 1',
                accessor: 'column1',
            },
            ...Array.from({ length: integerCount / 2 }, (_, i) => ({
                Header: `Column ${i + 2}`,
                accessor: `column${i + 2}`,
            })),
        ],
        [integerCount]
    );

    // Create the top and bottom tables
    const {
        getTableProps: getTopTableProps,
        getTableBodyProps: getTopTableBodyProps,
        headerGroups: topTableHeaderGroups,
        rows: topTableRows,
        prepareRow: prepareTopTableRow,
    } = useTable({
        columns: topTableColumns,
        data: topTableData,
    });

    const {
        getTableProps: getBottomTableProps,
        getTableBodyProps: getBottomTableBodyProps,
        headerGroups: bottomTableHeaderGroups,
        rows: bottomTableRows,
        prepareRow: prepareBottomTableRow,
    } = useTable({
        columns: bottomTableColumns,
        data: bottomTableData,
    });

    return (
        <div style={{ width: '100%', marginTop: '10px' }}>
            <table
                {...getTopTableProps()}
                className="table top-table"
                style={{ borderCollapse: 'collapse', margin: '0', tableLayout: 'auto' }}
            >
                <tbody {...getTopTableBodyProps()}>
                    {topTableRows.map((row, rowIndex) => {
                        prepareTopTableRow(row);
                        return (
                            <tr
                                {...row.getRowProps()}
                                className={rowIndex === 0 ? 'orange-row' : ''} // Add class to the first row
                            >
                                {row.cells.map((cell) => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            style={{
                                                borderBottom: '1px solid #ccc',
                                                borderRight: '1px solid #ccc', // Add vertical border
                                                padding: '8px',
                                                textAlign: 'left',
                                                color: rowIndex === 0 ? 'white' : 'black', // White text for the first row
                                                backgroundColor: rowIndex === 0 ? 'orange' : 'white', // Orange background for the first row
                                            }}
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <table
                {...getBottomTableProps()}
                className="table bottom-table"
                style={{ borderCollapse: 'collapse', margin: '0', tableLayout: 'auto' }}
            >
                <tbody {...getBottomTableBodyProps()}>
                    {bottomTableRows.map((row) => {
                        prepareBottomTableRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            style={{
                                                borderBottom: '1px solid #ccc',
                                                borderRight: '1px solid #ccc', // Add vertical border
                                                padding: '8px',
                                                textAlign: 'left',
                                            }}
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default GameProgressTable;
