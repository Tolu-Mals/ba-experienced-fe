export type TransactionType = "outgoing" | "incoming" | "all";
export type Transaction = {
	hash: string;
	from: string;
	to: string;
	value: string;
	txreceipt_status: "0" | "1";
	timeStamp: string;
};
