import { RefreshCcw } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import Header from "@/components/header";
import type { TransactionType } from "@/lib/types";
import { Input } from "./ui/input";
import { truncateAddress } from "@/lib/utils";
import { TransactionList } from "./transactions/transaction-list";
import { useQuery } from "@tanstack/react-query";

function isValidEthAddress(address: string) {
	return /^0x[a-fA-F0-9]{40}$/.test(address);
}

function Tracker() {
	const [address, setAddress] = useState("");
	const [input, setInput] = useState("");
	const [error, setError] = useState<string | null>(null);

	const [transactionType, setTransactionType] =
		useState<TransactionType>("outgoing");

	const titleText =
		transactionType === "outgoing"
			? "Outgoing Transactions"
			: transactionType === "all"
				? "All Transactions"
				: "Incoming Transactions";

	const handleSave = () => {
		const trimmed = input.trim();
		if (!isValidEthAddress(trimmed)) {
			setError("Please enter a valid Ethereum address.");
			return;
		}
		setAddress(trimmed);
		setError(null);
	};

	const { data, isLoading, isError, refetch, isFetching } = useQuery({
		queryKey: ["transactions", address, transactionType],
		queryFn: () => getTransactions(address, transactionType),
		enabled: Boolean(address),
		refetchInterval: 30000, // refresh every 30 seconds
		refetchOnWindowFocus: true,
	});

	const transactions = data?.transactions ?? [];
	console.log("transactions: ", transactions);

	return (
		<main className="max-w-lg mx-auto px-4 sm:border sm:mt-4 sm:rounded-lg bg-white flex flex-col gap-4 pt-4 pb-8 h-screen lg:h-auto sm:h-auto">
			<Header setTransactionType={setTransactionType} />

			<div className="flex flex-col gap-2 my-8">
				<label htmlFor="wallet-address" className="text-sm font-medium">
					ETH Address
				</label>
				<Input
					id="wallet-address"
					type="text"
					placeholder="e.g. 0x1234...abcd"
					value={input}
					onChange={(e) => {
						setInput(e.target.value);
						setError(null);
					}}
				/>
				<Button className="w-full mt-1" onClick={handleSave}>
					Save
				</Button>
			</div>
			{error && <p className="text-red-600 text-sm">{error}</p>}

			{!address && (
				<p className="text-center p-4 bg-gray-100 rounded-lg text-md font-semibold">
					Enter your ETH address to get started
				</p>
			)}

			{address && (
				<div>
					<div className="flex justify-between border-b pb-1 items-center">
						<p className="text-lg font-bold">{titleText}</p>
						<Button variant="ghost" onClick={() => refetch()}>
							<RefreshCcw className={isFetching ? "animate-spin" : ""} />
						</Button>
					</div>
					<p className="text-xs text-gray-600 mt-2 mb-1">
						Showing transactions for:{" "}
						<span className="font-mono">{truncateAddress(address)}</span>
					</p>
					<p className="text-xs text-gray-500 mb-4">
						List updates every 30 seconds
						{isFetching && (
							<span className="ml-2 text-blue-500">Refreshing…</span>
						)}
					</p>
					{isError && (
						<p className="text-red-600">Failed to load transactions.</p>
					)}
					{transactions && (
						<TransactionList
							isLoading={isLoading}
							transactions={transactions}
						/>
					)}
				</div>
			)}
		</main>
	);
}

export default Tracker;

async function getTransactions(
	address: string,
	transactionType: TransactionType,
) {
	const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;
	const res = await fetch(
		`${BASE_API_URL}/api/transaction?address=${address}&direction=${transactionType}`,
	);
	if (!res.ok) throw new Error("Failed to fetch transactions");
	return res.json();
}
