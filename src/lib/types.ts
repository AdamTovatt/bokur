export type Account = {
	id: number;
	name: string;
};

export type AccountValueInformation = {
	account: Account;
	balance: number;
};

export interface Transaction {
	id: number;
	externalId: string;
	name: string;
	value: number;
	date: Date;
	associatedFileName: string | null;
	affectedAccount: AffectedAccount;
	ignoreFileRequirement: boolean;
	ignored: boolean;
	parentId: number;
	hasChildren: boolean;
	children: Transaction[];
	siblingId: number;
	requiresAction: boolean;
}

export interface AffectedAccount {
	id: number;
	name: string;
}

export interface ApiResponse {
	message: string;
	success: boolean;
}
