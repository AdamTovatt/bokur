<script lang="ts">
	import { Color, BorderRadius } from '../constants';
	import Icon from '$lib/images/book.svelte';
	import HamburgerIcon from '../icons/HamburgerIcon.svelte';
	import { pageTitle, user } from '$lib/store';
	import { routeToPage } from '../functions/routing';
	import { cleanDuplicateTransactions, exportData } from '$lib/api';
	import BokurButton from './BokurButton.svelte';
	import VerticalSpacing from './VerticalSpacing.svelte';
	import auth from '$lib/authService';
	import { fly, fade, scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	let menuOpen: boolean = false;
	let profileMenuOpen: boolean = false;

	async function handleCleanDuplicateTransactions() {
		try {
			await cleanDuplicateTransactions();
		} catch (error) {
			console.error('Duplication cleaning failed:', error);
		}
	}

	async function handleExport() {
		try {
			await exportData();
		} catch (error) {
			console.error('Export failed:', error);
		}
	}

	async function handleLogout() {
		try {
			await auth.logout();
		} catch (error) {
			console.error('Logout failed:', error);
		}
	}

	function getInitials(name: string): string {
		return name
			.split(' ')
			.map(n => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2);
	}

	function handleOutsideClick(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!target.closest('.profile-menu') && !target.closest('.profile-button')) {
			profileMenuOpen = false;
		}
	}
</script>

<svelte:window on:click={handleOutsideClick} />

{#if menuOpen}
	<!-- Backdrop -->
	<button
		class="fixed inset-0 z-40 cursor-default"
		style="background-color: rgba(0, 0, 0, 0.6); backdrop-filter: blur(4px); border: none;"
		transition:fade={{ duration: 300, easing: cubicOut }}
		on:click={() => { menuOpen = false; }}
		on:keydown={(e) => { if (e.key === 'Escape') menuOpen = false; }}
		aria-label="Close menu"
	></button>

	<!-- Menu Container -->
	<div
		class="fixed bottom-0 left-0 right-0 z-50 p-6"
		transition:fly={{ y: 300, duration: 400, easing: cubicOut }}
	>
		<div
			class="max-w-sm mx-auto rounded-3xl p-6 shadow-2xl border border-opacity-20"
			style="background: linear-gradient(135deg, {Color.Depth2} 0%, {Color.Depth3} 100%); 
					border-color: {Color.Depth1}; overflow: visible;"
		>
			<!-- Header -->
			<div class="text-center mb-6">
				<h3 class="navigation-title text-xl font-semibold text-white mb-1 relative overflow-hidden">
					Navigation
				</h3>
				<div class="w-12 h-0.5 bg-blue-400 mx-auto rounded-full"></div>
			</div>

			<!-- Menu Items -->
			<div class="space-y-3" style="overflow: visible;">
				{#each [
					{ label: 'Home', action: () => routeToPage(''), icon: '🏠' },
					{ label: 'All Transactions', action: () => routeToPage('transactions'), icon: '📊' },
					{ label: 'Unhandled', action: () => routeToPage('unhandled-transactions'), icon: '⚠️' },
					{ label: 'Invoice', action: () => routeToPage('invoice'), icon: '📄' },
					{ label: 'Export', action: handleExport, icon: '📤' },
					{ label: 'Clean Duplicates', action: handleCleanDuplicateTransactions, icon: '🧹' }
				] as item, i}
					<button
						class="menu-item w-full flex items-center space-x-4 p-4 rounded-xl text-left text-white transition-all duration-200 hover:scale-105 active:scale-95"
						style="background-color: {Color.Depth4};"
						on:click={() => {
							item.action();
							menuOpen = false;
						}}
						transition:fly={{ x: -200, duration: 400, delay: 450 + (i * 80), easing: cubicOut }}
					>
						<span class="text-2xl">{item.icon}</span>
						<span class="font-medium">{item.label}</span>
						<div class="flex-1"></div>
						<span class="text-gray-400 text-sm">→</span>
					</button>
				{/each}
			</div>

			<!-- Close Button -->
			<div 
				class="mt-3 pt-4 border-t border-gray-600 border-opacity-30"
				transition:scale={{ duration: 200, delay: 300, easing: cubicOut }}
			>
				<button
					class="w-full p-3 rounded-xl text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200 font-medium"
					on:click={() => { menuOpen = false; }}
				>
					Close Menu
				</button>
			</div>
		</div>
	</div>
{/if}

<div
	class="taskbar flex items-center justify-between w-full fixed top-0 left-0 p-4 z-10"
	style="background-color: {Color.Depth2}; z-index: 10"
>
	<button
		on:click={() => {
			routeToPage('');
		}}
		class="flex items-center space-x-2"
	>
		<svelte:component this={Icon} />
		<span class="text-white font-semibold hidden sm:block">Bokur</span>
	</button>
	
	<nav class="hidden lg:flex items-center space-x-8">
		<a
			href="/"
			class="nav-link text-white hover:text-blue-300 transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2"
			on:click|preventDefault={() => routeToPage('')}
		>
			<span>🏠</span>
			<span>Home</span>
		</a>
		<a
			href="/transactions"
			class="nav-link text-white hover:text-blue-300 transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2"
			on:click|preventDefault={() => routeToPage('transactions')}
		>
			<span>📊</span>
			<span>All Transactions</span>
		</a>
		<a
			href="/unhandled-transactions"
			class="nav-link text-white hover:text-blue-300 transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2"
			on:click|preventDefault={() => routeToPage('unhandled-transactions')}
		>
			<span>⚠️</span>
			<span>Unhandled</span>
		</a>
		<a
			href="/invoice"
			class="nav-link text-white hover:text-blue-300 transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2"
			on:click|preventDefault={() => routeToPage('invoice')}
		>
			<span>📄</span>
			<span>Invoice</span>
		</a>
		
		<div class="border-l border-gray-600 h-6 mx-4"></div>
		
		<button
			class="nav-button text-white hover:text-blue-300 transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2"
			on:click={handleExport}
		>
			<span>📤</span>
			<span>Export</span>
		</button>
		<button
			class="nav-button text-white hover:text-blue-300 transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2"
			on:click={handleCleanDuplicateTransactions}
		>
			<span>🧹</span>
			<span>Clean Duplicates</span>
		</button>
	</nav>

	<div class="flex items-center space-x-4">
		<div class="relative">
			<button
				class="profile-button flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-medium hover:bg-gray-700 transition-colors"
				style="background-color: {Color.Depth4};"
				on:click={() => profileMenuOpen = !profileMenuOpen}
			>
				{$user.name ? getInitials($user.name) : '?'}
			</button>
			
			{#if profileMenuOpen}
				<div
					class="profile-menu absolute right-0 mt-2 w-48 rounded-md shadow-lg z-50"
					style="background-color: {Color.Depth3}; border: 1px solid {Color.Depth2};"
				>
					<div class="py-1">
						<div class="px-4 py-2 text-sm text-gray-300 border-b border-gray-600">
							{$user.name || 'User'}
							<div class="text-xs text-gray-400">{$user.email || ''}</div>
						</div>
						<button
							class="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors"
							on:click={handleLogout}
						>
							Logout
						</button>
					</div>
				</div>
			{/if}
		</div>
		

	</div>
</div>

<!-- Floating Hamburger Menu -->
<button
	class="floating-hamburger lg:hidden"
	class:open={menuOpen}
	style="position: fixed; 
			bottom: 1.5rem; 
			right: 1.5rem; 
			width: 3.5rem; 
			height: 3.5rem; 
			border-radius: 50%; 
			display: flex; 
			align-items: center; 
			justify-content: center; 
			z-index: 40;
			background: linear-gradient(135deg, {Color.Depth3} 0%, {Color.Depth4} 100%); 
			border: 2px solid {Color.Depth1};
			box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);"
	on:click={() => menuOpen = true}
>
	<div class="hamburger-icon" style="width: 1.5rem; height: 1.5rem; display: flex; align-items: center; justify-content: center;">
		<HamburgerIcon />
	</div>
</button>

<style>
	:global(svg) {
		width: 3rem;
		display: block;
	}
	
	.floating-hamburger .hamburger-icon svg {
		width: 1.5rem !important;
		height: 1.5rem !important;
		position: static !important;
		display: block !important;
	}
	
	.floating-hamburger {
		backdrop-filter: blur(10px);
		position: relative;
		overflow: hidden;
	}
	
	.floating-hamburger::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
		transform: translateX(-100%);
		transition: transform 0.6s;
	}
	
	.floating-hamburger:hover::before {
		transform: translateX(100%);
	}
	
	.floating-hamburger:hover {
		transform: scale(1.1) rotate(5deg);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
	}
	
	.floating-hamburger:active {
		transform: scale(0.95);
	}
	
	.floating-hamburger.open {
		transform: scale(0.9) rotate(90deg);
	}
	
	.hamburger-icon {
		transition: all 0.3s ease;
		pointer-events: none;
	}
	
	.menu-item {
		position: relative;
		overflow: hidden;
		backdrop-filter: blur(10px);
	}
	
	.menu-item::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
		transition: left 0.5s;
	}
	
	.menu-item:hover::before {
		left: 100%;
	}
	
	.menu-item:hover {
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
		transform: translateY(-2px) scale(1.02);
	}
	
	.menu-item:active {
		transform: translateY(0) scale(0.98);
	}
	
	.navigation-title {
		position: relative;
		color: white;
		text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
	}
	
	.navigation-title::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			90deg,
			transparent 0%,
			rgba(255, 255, 255, 0.6) 20%,
			rgba(255, 255, 255, 1) 50%,
			rgba(255, 255, 255, 0.6) 80%,
			transparent 100%
		);
		mix-blend-mode: overlay;
		animation: schwing 0.8s ease-out 0.6s;
		pointer-events: none;
		z-index: 1;
	}
	
	@keyframes schwing {
		0% {
			left: -100%;
			opacity: 0;
		}
		10% {
			opacity: 1;
		}
		90% {
			opacity: 1;
		}
		100% {
			left: 100%;
			opacity: 0;
		}
	}
</style>
