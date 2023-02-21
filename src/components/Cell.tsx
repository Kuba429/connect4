import { FC } from "react";

export type cell = {
	value: string;
	id: number;
	x: number;
	y: number;
};

export const Cell: FC<{ cell: cell }> = ({ cell }) => {
	return <div className="cell">{cell.value}</div>;
};
