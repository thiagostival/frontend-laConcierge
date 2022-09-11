import {
  Table as ChackraTable,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  TableProps,
  TableColumnHeaderProps,
  TableCellProps,
  TableRowProps,
  TableContainerProps,
  Box,
  TableHeadProps,
  TableBodyProps,
  TableFooterProps,
} from "@chakra-ui/react";

// TYPES
interface IBaseSections<T> {
  props?: T;
  rowsProps?: TableRowProps;
  columnsProps?: TableColumnHeaderProps;
  rows: Array<{
    props?: TableRowProps;
    columns: Array<{
      value: string;
      props?: TableCellProps;
    }>;
  }>;
}

interface ITableProps {
  headers?: IBaseSections<TableHeadProps>;
  body?: IBaseSections<TableBodyProps>;
  footer?: IBaseSections<TableFooterProps>;
  caption?: string;
  tableProps?: TableProps;
  containerProps?: TableContainerProps;
}

export function Table({
  headers,
  body,
  footer,
  containerProps = {},
  tableProps = {},
  caption,
}: ITableProps) {
  return (
    <Box {...containerProps}>
      <ChackraTable {...tableProps}>
        {!!caption && <TableCaption>{caption}</TableCaption>}

        {!!headers && (
          <Thead {...headers?.props}>
            {headers.rows.map((row, idxC) => (
              <Tr
                key={`${row.columns.length}-${idxC}`}
                {...headers?.rowsProps}
                {...row?.props}
              >
                {!!row.columns &&
                  row.columns.map((column, idx) => (
                    <Th
                      key={`${column.value}-${idx}`}
                      {...headers?.columnsProps}
                      {...column?.props}
                    >
                      {column.value}
                    </Th>
                  ))}
              </Tr>
            ))}
          </Thead>
        )}

        {!!body && (
          <Tbody {...body?.props}>
            {body.rows.map((row, idxC) => (
              <Tr
                key={`${row.columns.length}-${idxC}`}
                {...body?.rowsProps}
                {...row?.props}
              >
                {!!row.columns.length &&
                  row.columns.map((column, idx) => (
                    <Td
                      key={`${column.value}-${idx}`}
                      {...body?.columnsProps}
                      {...column.props}
                    >
                      {column.value}
                    </Td>
                  ))}
              </Tr>
            ))}
          </Tbody>
        )}

        {!!footer && (
          <Tfoot {...footer?.props}>
            {footer.rows.map((row, idx) => (
              <Tr
                key={`${row.columns.length}-${idx}`}
                {...footer?.rowsProps}
                {...row?.props}
              >
                {!!row.columns &&
                  row.columns.map((column, idx) => (
                    <Th
                      key={`${column.value}-${idx}`}
                      {...footer?.columnsProps}
                      {...column?.props}
                    >
                      {column.value}
                    </Th>
                  ))}
              </Tr>
            ))}
          </Tfoot>
        )}
      </ChackraTable>
    </Box>
  );
}
