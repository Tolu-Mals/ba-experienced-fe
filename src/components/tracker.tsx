import { RefreshCcw } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
// import type {
// 	BitcoinBalance,
// 	EtherBalance,
// 	EtherscanResponse,
// 	Token,
// } from "@/lib/types";
import Header from "@/components/header";
import type { TransactionType } from "@/lib/types";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import BalanceForm from "./balance-form";
// import Balance from "./balance";

type Transaction = {
	hash: string;
	from: string;
	to: string;
	amount: string;
	status: string;
	timestamp: string;
};

const transactions: Transaction[] = [
	{
		hash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f",
		from: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
		to: "0x53d284357ec70cE289D6D64134DfAc8E511c8a3D",
		amount: "1.25",
		status: "confirmed",
		timestamp: "2025-06-04T10:15:00Z",
	},
	{
		hash: "0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g",
		from: "0x53d284357ec70cE289D6D64134DfAc8E511c8a3D",
		to: "0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0",
		amount: "0.75",
		status: "pending",
		timestamp: "2025-06-04T11:20:00Z",
	},
	{
		hash: "0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h",
		from: "0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0",
		to: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
		amount: "2.00",
		status: "pending",
		timestamp: "2025-06-04T12:30:00Z",
	},
	{
		hash: "0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i",
		from: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
		to: "0x61edcdf5bb737adffb0bc9a3a8a4a7d5b5b5b5b5",
		amount: "0.50",
		status: "confirmed",
		timestamp: "2025-06-04T13:45:00Z",
	},
	{
		hash: "0x5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j",
		from: "0x61edcdf5bb737adffb0bc9a3a8a4a7d5b5b5b5b5",
		to: "0x53d284357ec70cE289D6D64134DfAc8E511c8a3D",
		amount: "3.10",
		status: "pending",
		timestamp: "2025-06-04T14:55:00Z",
	},
];

function TransactionStatusBadge({ status }: { status: string }) {
	const color =
		status === "confirmed"
			? "bg-green-100 text-green-800"
			: "bg-yellow-100 text-yellow-800"; // All non-confirmed (pending, failed, etc.) use yellow
	return (
		<span className={`px-2 py-1 rounded text-xs font-semibold ${color}`}>
			{status.charAt(0).toUpperCase() + status.slice(1)}
		</span>
	);
}

function truncateAddress(address: string) {
	return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function TransactionList({
	transactions,
}: {
	transactions: Transaction[];
}) {
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
						<TransactionStatusBadge status={tx.status} />
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
							<b>Amount:</b> {tx.amount} ETH
						</span>
						<span className="text-xs text-gray-400">
							{new Date(tx.timestamp).toLocaleString()}
						</span>
					</div>
				</div>
			))}
		</div>
	);
}

function Tracker() {
	const [transactionType, setTransactionType] =
		useState<TransactionType>("outgoing");
	const titleText =
		transactionType === "outgoing"
			? "Outgoing Transactions"
			: "Incoming Transactions";
	// const queryClient = useQueryClient();
	// const [token, setToken] = useState<Token>("bitcoin");
	// const [address, setAddress] = useState<string>("");
	// const { data, isLoading, error, isRefetching, status } = useQuery<
	// 	BitcoinBalance | EtherBalance
	// >({
	// 	queryKey: [token, address],
	// 	queryFn: () => getWalletBalance(token, address),
	// 	refetchInterval: 30_000,
	// 	enabled: Boolean(address),
	// });

	// console.log(status);

	// // biome-ignore lint/correctness/useExhaustiveDependencies: Need to reset address if the token type changes, since address is specific to token type
	// useEffect(() => {
	// 	setAddress("");
	// }, [token]);

	// const refreshBalance = () => {
	// 	queryClient.invalidateQueries({ queryKey: [token, address] });
	// };

	return (
		<main className="max-w-lg mx-auto px-4 sm:border sm:mt-4 sm:rounded-lg bg-white flex flex-col gap-8 pt-4 pb-8 h-screen sm:h-auto">
			<Header setTransactionType={setTransactionType} />

			<div className="flex justify-between border-b pb-1">
				<p className="text-lg font-bold">{titleText}</p>
				<Button variant="ghost">
					<RefreshCcw />
				</Button>
			</div>

			<TransactionList transactions={transactions} />

			{/* {!error && (
				<Balance
					data={data}
					token={token}
					address={address}
					isLoading={isLoading}
					isRefetching={isRefetching}
					refreshBalance={refreshBalance}
				/>
			)}

			<BalanceForm
				networkError={error?.message}
				token={token}
				setAddress={setAddress}
				isLoading={isLoading}
			/> */}
		</main>
	);
}

export default Tracker;

// async function getWalletBalance(token: Token, address: string) {
// 	if (token === "bitcoin") {
// 		const response = await fetch(
// 			`https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance`,
// 		);

// 		if (!response.ok) {
// 			console.error(response.json());
// 			throw new Error("There was a network error, please try again later");
// 		}

// 		return response.json();
// 	}

// 	const ETHERSCAN_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY;

// 	const response = await fetch(
// 		`https://api.etherscan.io/v2/api?chainid=1&module=account&action=balance&address=${address}&tag=latest&apikey=${ETHERSCAN_API_KEY}`,
// 	);

// 	const data: EtherscanResponse = await response.json();

// 	if (data.message === "NOTOK") {
// 		console.error(data.result);
// 		throw new Error("There was a network error, please try again later");
// 	}

// 	return data;
// }
