import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { TransactionType } from "@/lib/types";
import type { Dispatch, SetStateAction } from "react";

export default function Header({
	setTransactionType,
}: { setTransactionType: Dispatch<SetStateAction<TransactionType>> }) {
	return (
		<div className="flex justify-between items-center">
			<p className="flex gap-2 text-md items-center font-bold">
				<HistoryIcon />
				ETH TX Tracker
			</p>
			<Select
				defaultValue="all"
				onValueChange={(value: TransactionType) => setTransactionType(value)}
			>
				<SelectTrigger className="w-[120px]">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">All</SelectItem>
					<SelectItem value="incoming">Incoming</SelectItem>
					<SelectItem value="outgoing">Outgoing</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
}

function HistoryIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="url(#blue-gradient)"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<defs>
				<linearGradient
					id="blue-gradient"
					x1="0"
					y1="0"
					x2="24"
					y2="24"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#3b82f6" /> {/* blue-500 */}
					<stop offset="1" stopColor="#06b6d4" /> {/* cyan-500 */}
				</linearGradient>
			</defs>
			<title>History</title>
			<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
			<path d="M3 3v5h5" />
			<path d="M12 7v5l4 2" />
		</svg>
	);
}
