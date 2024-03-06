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
	ignored: boolean;
	parentId: number;
	hasChildren: boolean;
	children: string[];
	siblingId: number;
	requiresAction: boolean;
}

export interface AffectedAccount {
	id: number;
	name: string;
}
