import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const Table = ({ rows, columns }) => {
    return (
        <div style={{ height: 450 }}>
            <DataGrid
                getRowId={(row) =>  Math.random()}
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[10, 20]}
            />
        </div>
    );
}
export default Table;