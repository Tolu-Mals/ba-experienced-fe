import type { Transaction } from "@/lib/types";
import { truncateAddress } from "@/lib/utils";

export function TransactionList({
	transactions,
	isLoading,
}: {
	transactions: Transaction[];
	isLoading: boolean;
}) {
	if (isLoading) {
		return (
			<div className="flex flex-col gap-4">
				{Array.from({ length: 5 }).map((_, i) => (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: doesn't matter since it's loading ui
						key={i}
						className="border rounded-lg p-3 flex flex-col gap-2 animate-pulse bg-gray-50"
					>
						<div className="flex justify-between items-center">
							<div className="h-3 bg-gray-200 rounded w-1/2" />
							<div className="h-4 bg-gray-200 rounded w-16" />
						</div>
						<div className="flex flex-wrap gap-2 text-sm">
							<div className="h-3 bg-gray-200 rounded w-32" />
							<div className="h-3 bg-gray-200 rounded w-32" />
						</div>
						<div className="flex justify-between items-center mt-1">
							<div className="h-3 bg-gray-200 rounded w-20" />
							<div className="h-3 bg-gray-200 rounded w-24" />
						</div>
					</div>
				))}
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-4">
			{transactions.map((tx) => (
				<div
					key={tx.hash}
					className="border rounded-lg p-3 flex flex-col gap-1"
				>
					<div className="flex justify-between items-center">
						<span className="font-mono text-xs text-gray-500 truncate max-w-[60%]">
							{tx.hash}
						</span>
						<TransactionStatusBadge status={tx.txreceipt_status} />
					</div>
					<div className="flex flex-wrap gap-2 text-sm">
						<span>
							<b>From:</b>{" "}
							<span className="font-mono text-xs">
								{truncateAddress(tx.from)}
							</span>
						</span>
						<span>
							<b>To:</b>{" "}
							<span className="font-mono text-xs">
								{truncateAddress(tx.to)}
							</span>
						</span>
					</div>
					<div className="flex justify-between items-center mt-1">
						<span className="text-sm">
							<b>Amount:</b> {(Number(tx.value) / 1e18).toFixed(8)} ETH
						</span>
						<span className="text-xs text-gray-400">
							{new Date(Number(tx.timeStamp) * 1000).toLocaleString(undefined, {
								year: "numeric",
								month: "short",
								day: "2-digit",
								hour: "2-digit",
								minute: "2-digit",
								second: "2-digit",
							})}
						</span>
					</div>
				</div>
			))}
		</div>
	);
}

function TransactionStatusBadge({ status }: { status: "1" | "0" }) {
	const color =
		status === "1" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
	return (
		<span className={`px-2 py-1 rounded text-xs font-semibold ${color}`}>
			{status === "1" ? "Completed" : "Failed"}
		</span>
	);
}
