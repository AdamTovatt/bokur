import { token } from '$lib/store';
import type { Account } from './apiModels';

const apiUrl = "https://sakurapi.se/bokur/";
let localToken = "";
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
  