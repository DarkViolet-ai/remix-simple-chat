/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import { FaCircleChevronDown, FaCircleChevronUp } from "react-icons/fa6";
import { GrUnsorted } from "react-icons/gr";
import HStackFull from "~/components/buildingBlocks/hStackFull";
import Icon from "~/components/buildingBlocks/icon";
import IconButton from "./iconButton";
import { CloseIcon } from "styles";

const tableStyles = "w-full bg-col-950 max-w-full";
const headerStyles = "text-center font-bold bg-100-linear3op50 text-col-900";
const headerCellStyles = "rounded-none py-[0.5vh] text-nowrap px-[0.5vh]";
const headerTextStyles =
  "text-[1.3vh] md:text-[1.5vh] xl:text-[1.8vh] xxl:text-[2vh] font-bold text-stroke-5-900";
const rowStyles =
  "bg-col-900 hover:bg-col-780 text-center group transition-400";
const cellStyles =
  "py-[1vh] px-[0.5vh] group-hover:rounded-none transition-400 text-[1.2vh] xl:text-[1.6vh] xxl:text-[1.8vh] text-col-100";

type DataType = {
  [key: string]: any;
};

interface ColumnType {
  title: string;
  dataIndex: string;
  render?: (value: any, record: DataType, index: number) => React.ReactNode;
}

interface TableProps {
  data: DataType[];
  columns: ColumnType[];
  removeColumn?: boolean;
  removeFunction?: (record: DataType) => void;
  deleteLoading?: boolean;
  additionalColumn?: boolean;
  additionalIcon?: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  additionalFunction?: (record: DataType) => void;
  additionalTitle?: string;
  additionalLoading?: boolean;
}

export default function Table({
  data,
  columns,
  removeColumn = false,
  removeFunction,
  deleteLoading = false,
  additionalColumn = false,
  additionalIcon,
  additionalFunction,
  additionalTitle,
  additionalLoading = false,
}: TableProps) {
  const [sortColumn, setSortColumn] = useState(columns[0].dataIndex);
  const [sortDirection, setSortDirection] = useState("asc");

  const tableColumns = useMemo(() => {
    const newColumns = [...columns];

    if (removeColumn) {
      newColumns.push({
        title: "Remove",
        dataIndex: "remove",
        render: (value, record, index) => (
          <IconButton
            key={index}
            icon={CloseIcon}
            onClick={() => removeFunction && removeFunction(record)}
            isLoading={deleteLoading}
            label="remove user"
            type="smallNegative"
            tooltipPlacement="left"
          />
        ),
      });
    }

    if (
      additionalColumn &&
      additionalIcon &&
      additionalFunction &&
      additionalTitle
    ) {
      newColumns.push({
        title: additionalTitle,
        dataIndex: "additional",
        render: (value, record, index) => (
          <IconButton
            key={index}
            icon={additionalIcon}
            onClick={() => additionalFunction && additionalFunction(record)}
            isLoading={additionalLoading}
            label={additionalTitle}
            type="smallNormal"
            tooltipPlacement="left"
          />
        ),
      });
    }

    return newColumns;
  }, [
    columns,
    removeColumn,
    removeFunction,
    deleteLoading,
    additionalColumn,
    additionalIcon,
    additionalFunction,
    additionalTitle,
    additionalLoading,
  ]);

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];

      if (valueA == null || valueB == null) {
        return 0;
      }

      if (sortDirection === "asc") {
        return valueA.toString().localeCompare(valueB.toString());
      } else {
        return valueB.toString().localeCompare(valueA.toString());
      }
    });
  }, [data, sortColumn, sortDirection]);

  function SortableHeader({
    title,
    dataIndex,
    specialStyle = "bg-col-280",
  }: ColumnType & { specialStyle?: string }) {
    return (
      <th
        className={`${headerCellStyles} ${
          sortColumn === dataIndex ? specialStyle : ""
        }`}
        onClick={() => handleSort(dataIndex)}
      >
        <HStackFull
          className={`justify-center items-center ${headerTextStyles}`}
          gap="gap-[2vh]"
        >
          {title}
          {sortColumn === dataIndex ? (
            <Icon
              icon={
                sortDirection === "asc"
                  ? FaCircleChevronUp
                  : FaCircleChevronDown
              }
              iconClassName="text-xs md:text-sm xl:text-md"
            />
          ) : (
            <Icon
              icon={GrUnsorted}
              iconClassName="text-xs md:text-sm xl:text-md"
            />
          )}
        </HStackFull>
      </th>
    );
  }

  return (
    <table className={tableStyles}>
      <thead className={headerStyles}>
        <tr>
          {tableColumns.map((column) => (
            <SortableHeader key={column.dataIndex} {...column} />
          ))}
        </tr>
      </thead>
      <tbody className="max-h-[80vh] overflow-y-auto">
        {sortedData.map((row, index) => (
          <tr key={index} className={rowStyles}>
            {tableColumns.map((column) => (
              <td key={column.dataIndex} className={cellStyles}>
                {column.render
                  ? column.render(row[column.dataIndex], row, index)
                  : row[column.dataIndex]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
