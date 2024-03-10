import { token } from '$lib/store';
import type { Account, AccountValueInformation, ApiResponse, Transaction } from './types';

//const apiUrl = 'https://sakurapi.se/bokur/';
const apiUrl = 'https://localhost:5001/';
let localToken = '';
let cachedAccounts: Account[] | null = null;

token.subscribe((value) => {
	localToken = value;
});

export async function getAllAccounts(): Promise<Account[]> {
	try {
		if (cachedAccounts !== null) {
			// If accounts are already in the cache, return them
			return cachedAccounts;
		}

		const response = await fetch(apiUrl + 'account/get-all', {
			headers: {
				Authorization: 'Bearer ' + localToken
			}
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch accounts. Status: ${response.status}`);
		}

		const accounts: Account[] = await response.json();

		// Cache the accounts
		cachedAccounts = accounts;

		return accounts;
	} catch (error) {
		// Handle errors, log them, or rethrow if necessary
		console.error('Error fetching accounts:', error);
		throw error;
	}
}

export async function getAccountSummaries(): Promise<AccountValueInformation[]> {
	try {
		const response = await fetch(apiUrl + 'transaction/summary-of-all', {
			headers: {
				Authorization: 'Bearer ' + localToken
			}
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch account summaries. Status: ${response.status}`);
		}

		const accountSummaries: AccountValueInformation[] = await response.json();
		return accountSummaries;
	} catch (error) {
		// Handle errors, log them, or rethrow if necessary
		console.error('Error fetching account summaries:', error);
		throw error;
	}
}

export async function getRequisitionDaysLeft(): Promise<number> {
	try {
		const response = await fetch(apiUrl + 'transaction/requisition/days-left', {
			headers: {
				Authorization: 'Bearer ' + localToken
			}
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch requisition days left. Status: ${response.status}`);
		}

		const daysLeft: number = parseFloat(await response.text());

		return daysLeft;
	} catch (error) {
		// Handle errors, log them, or rethrow if necessary
		console.error('Error fetching requisition days left:', error);
		throw error;
	}
}

// /transaction/get-all-that-requires-action

export async function getAllThatRequiresAction(): Promise<Transaction[]> {
	try {
		const response = await fetch(apiUrl + 'transaction/get-all-that-requires-action', {
			headers: {
				Authorization: 'Bearer ' + localToken
			}
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch get all that requires action. Status: ${response.status}`);
		}

		const transactions: Transaction[] = await response.json();

		return transactions;
	} catch (error) {
		// Handle errors, log them, or rethrow if necessary
		console.error('Error fetching get all that requires action:', error);
		throw error;
	}
}

export async function getAllTransactions(
	pageSize: number,
	pageNumber: number
): Promise<Transaction[]> {
	try {
		const response = await fetch(
			apiUrl + 'transaction/get-all?pageSize=' + pageSize + '&pageNumber=' + pageNumber,
			{
				headers: {
					Authorization: 'Bearer ' + localToken
				}
			}
		);

		if (!response.ok) {
			throw new Error(`Failed to fetch get all transactions. Status: ${response.status}`);
		}

		const transactions: Transaction[] = await response.json();

		return transactions;
	} catch (error) {
		// Handle errors, log them, or rethrow if necessary
		console.error('Error fetching get all transactions:', error);
		throw error;
	}
}

export async function getTransaction(id: string): Promise<Transaction> {
	try {
		const response = await fetch(apiUrl + 'transaction/' + id, {
			headers: {
				Authorization: 'Bearer ' + localToken
			}
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch get all that requires action. Status: ${response.status}`);
		}

		const transaction: Transaction = await response.json();

		return transaction;
	} catch (error) {
		// Handle errors, log them, or rethrow if necessary
		console.error('Error fetching get all that requires action:', error);
		throw error;
	}
}

export async function updateTransaction(transaction: Transaction): Promise<void> {
	try {
		const response = await fetch(apiUrl + 'transaction/update', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localToken
			},
			body: JSON.stringify(transaction)
		});

		if (!response.ok) {
			throw new Error(`Failed to update transaction. Status: ${response.status}`);
		}

		// Optionally handle response data if necessary
	} catch (error) {
		// Handle errors, log them, or rethrow if necessary
		console.error('Error updating transaction:', error);
		throw error;
	}
}

export async function uploadFile(file: File, transactionId: number): Promise<void> {
	try {
		const formData = new FormData();
		formData.append('file', file);

		const response = await fetch(apiUrl + `transaction/${transactionId}/file/upload`, {
			method: 'PUT',
			headers: {
				Authorization: 'Bearer ' + localToken
			},
			body: formData
		});

		if (!response.ok) {
			throw new Error(`Failed to upload file. Status: ${response.status}`);
		}

		// Optionally handle response data if necessary
	} catch (error) {
		// Handle errors, log them, or rethrow if necessary
		console.error('Error uploading file:', error);
		throw error;
	}
}

export async function downloadTransactionFile(
	transactionId: number,
	fileName: string
): Promise<void> {
	try {
		const response = await fetch(apiUrl + `transaction/${transactionId}/file/download`, {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + localToken
			}
		});

		if (!response.ok) {
			throw new Error(`Failed to download transaction file. Status: ${response.status}`);
		}

		const blob = await response.blob();

		// Create a temporary link element to trigger the download
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = fileName;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);

		// Optionally handle response data if necessary
	} catch (error) {
		// Handle errors, log them, or rethrow if necessary
		console.error('Error downloading transaction file:', error);
		throw error;
	}
}

export async function deleteTransactionFile(transactionId: number): Promise<void> {
	try {
		const response = await fetch(apiUrl + `transaction/${transactionId}/file/delete`, {
			method: 'DELETE',
			headers: {
				Authorization: 'Bearer ' + localToken
			}
		});

		if (!response.ok) {
			throw new Error(`Failed to delete transaction file. Status: ${response.status}`);
		}

		// Optionally handle response data if necessary
	} catch (error) {
		// Handle errors, log them, or rethrow if necessary
		console.error('Error deleting transaction file:', error);
		throw error;
	}
}

export async function deleteTransaction(transactionId: number): Promise<void> {
	try {
		const response = await fetch(apiUrl + `transaction/${transactionId}/delete`, {
			method: 'PUT',
			headers: {
				Authorization: 'Bearer ' + localToken
			}
		});

		if (!response.ok) {
			throw new Error(`Failed to delete transaction. Status: ${response.status}`);
		}

		// Optionally handle response data if necessary
	} catch (error) {
		// Handle errors, log them, or rethrow if necessary
		console.error('Error deleting transaction:', error);
		throw error;
	}
}

export async function createTransfer(
	parentTransactionId: number,
	toAccountId: number,
	amount: number
): Promise<void> {
	try {
		const url = new URL(apiUrl + 'transaction/transfer/create');
		url.searchParams.append('parentTransactionId', parentTransactionId.toString());
		url.searchParams.append('toAccountId', toAccountId.toString());
		url.searchParams.append('amount', amount.toString());

		const response = await fetch(url.toString(), {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + localToken
			}
		});

		if (!response.ok) {
			throw new Error(`Failed to create transfer. Status: ${response.status}`);
		}

		// Optionally handle response data if necessary
	} catch (error) {
		// Handle errors, log them, or rethrow if necessary
		console.error('Error creating transfer:', error);
		throw error;
	}
}

export async function setTransactionAccount(
	transactionId: number,
	accountId: number
): Promise<void> {
	try {
		const url = new URL(apiUrl + `transaction/${transactionId}/set-account`);
		url.searchParams.append('accountId', accountId.toString());

		const response = await fetch(url.toString(), {
			method: 'PUT',
			headers: {
				Authorization: 'Bearer ' + localToken
			}
		});

		if (!response.ok) {
			throw new Error(`Failed to set transaction account. Status: ${response.status}`);
		}

		// Optionally handle response data if necessary
	} catch (error) {
		// Handle errors, log them, or rethrow if necessary
		console.error('Error setting transaction account:', error);
		throw error;
	}
}

export async function setTransactionAmount(transactionId: number, amount: number): Promise<void> {
	try {
		const url = new URL(apiUrl + `transaction/${transactionId}/set-amount`);
		url.searchParams.append('amount', amount.toString());

		const response = await fetch(url.toString(), {
			method: 'PUT',
			headers: {
				Authorization: 'Bearer ' + localToken
			}
		});

		if (!response.ok) {
			throw new Error(`Failed to set transaction amount. Status: ${response.status}`);
		}

		// Optionally handle response data if necessary
	} catch (error) {
		// Handle errors, log them, or rethrow if necessary
		console.error('Error setting transaction amount:', error);
		throw error;
	}
}

export async function createRequisition(redirectUrl?: string): Promise<ApiResponse> {
	try {
		const response = await fetch(apiUrl + 'transaction/create-requsition', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localToken
			},
			body: JSON.stringify({ redirectUrl })
		});

		const data = await response.json();

		return {
			message: data.message,
			success: response.ok
		};
	} catch (error) {
		console.error('Error creating requisition:', error);
		throw error;
	}
}
