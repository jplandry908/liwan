import { type ReactElement, useEffect, useState } from "react";
import styles from "./table.module.css";

export type Column<T> = {
	id: string;
	header?: string | ReactElement;
	icon?: ReactElement;
	render?: (row: T) => ReactElement | string;
	full?: boolean;
	nowrap?: boolean;
};

export const Table = <T extends { id: string }>({
	rows,
	columns,
	isLoading,
}: {
	rows: T[];
	columns: Column<T>[];
	isLoading: boolean;
}) => {
	// prevent hydration mismatch
	const [loading, setLoading] = useState(true);
	useEffect(() => setLoading(isLoading), [isLoading]);

	if (loading) return <div className={"loading-spinner"} />;

	return (
		<div className={styles.container}>
			<table className={styles.table}>
				<thead>
					<tr>
						{columns?.map((col) => (
							<th scope="col" key={col.id} className={col.full ? styles.full : undefined}>
								{col.icon ? (
									<div className={styles.icon}>
										{col.icon}
										{col.header ?? null}
									</div>
								) : (
									(col.header ?? null)
								)}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows?.length ? (
						rows.map((row) => (
							<tr key={row.id}>
								{columns?.map((col) => (
									<td key={col.id} className={col.nowrap ? styles.nowrap : undefined}>
										{col.render ? col.render(row) : null}
									</td>
								))}
							</tr>
						))
					) : (
						<tr>
							<td colSpan={columns?.length} className="h-24 text-center">
								No results.
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};
