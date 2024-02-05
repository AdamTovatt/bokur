import { goto } from '$app/navigation';

export function routeToPage(route: string, replaceState = false) {
	goto(`/${route}`, { replaceState });
}
