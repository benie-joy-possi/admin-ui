import { Layout } from "@/components/Layout";
import { Spinner } from "@/components/Spinner";
import { api } from "@/utils/api";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const CustomerDetailPage: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const {
		data: customer,
		isLoading,
		error,
	} = api.budget.getCustomerInfo.useQuery(
		{ end_user_id: id as string },
		{ enabled: !!id },
	);

	if (isLoading) {
		return (
			<Layout>
				<Spinner />
			</Layout>
		);
	}

	if (error) {
		return <Layout>Error: {error.message}</Layout>;
	}

	if (!customer) {
		return <div>Customer not found</div>;
	}

	return (
		<div className="relative flex h-auto min-h-screen w-full">
			<aside className="flex w-64 flex-col border-black/10 border-r bg-white dark:border-white/10 dark:bg-background-dark">
				<div className="flex h-16 items-center gap-4 px-6">
					<div className="h-8 w-8 text-primary">
						<svg
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>LiteLLM Logo</title>
							<path d="M12 2L2 7l10 5 10-5-10-5z" />
							<path d="M2 17l10 5 10-5" />
							<path d="M2 12l10 5 10-5" />
						</svg>
					</div>
					<h2 className="font-bold text-black text-lg dark:text-white">
						LiteClient
					</h2>
				</div>
				<nav className="flex-1 space-y-2 p-4">
					<a
						className="flex items-center gap-3 rounded-lg px-4 py-2 font-medium text-black/60 text-sm transition-colors hover:bg-black/5 dark:text-white/60 dark:hover:bg-white/5"
						href="/"
					>
						<span className="material-symbols-outlined"> dashboard </span>
						<span>Dashboard</span>
					</a>
					<a
						className="flex items-center gap-3 rounded-lg bg-primary/10 px-4 py-2 font-medium text-primary text-sm"
						href="/admin/customers"
					>
						<span className="material-symbols-outlined"> group </span>
						<span>Customers</span>
					</a>
					<a
						className="flex items-center gap-3 rounded-lg px-4 py-2 font-medium text-black/60 text-sm transition-colors hover:bg-black/5 dark:text-white/60 dark:hover:bg-white/5"
						href="/"
					>
						<span className="material-symbols-outlined">
							{" "}
							account_balance_wallet{" "}
						</span>
						<span>Budgets</span>
					</a>
					<a
						className="flex items-center gap-3 rounded-lg px-4 py-2 font-medium text-black/60 text-sm transition-colors hover:bg-black/5 dark:text-white/60 dark:hover:bg-white/5"
						href="/"
					>
						<span className="material-symbols-outlined"> assessment </span>
						<span>Reports</span>
					</a>
					<a
						className="flex items-center gap-3 rounded-lg px-4 py-2 font-medium text-black/60 text-sm transition-colors hover:bg-black/5 dark:text-white/60 dark:hover:bg-white/5"
						href="/"
					>
						<span className="material-symbols-outlined"> settings </span>
						<span>Settings</span>
					</a>
				</nav>
				<div className="border-black/10 border-t p-4 dark:border-white/10">
					<div className="flex items-center gap-3">
						<div className="aspect-square w-10 overflow-hidden rounded-full">
							<img
								alt="User avatar"
								className="h-full w-full object-cover"
								src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqYwxDkHyvT8aBoP1K_HwH6lUsgKsMl9LFd9PEhDTKA5EQJQvvzLOmzwIbNABnhrYRpiMHz_GG6aZxDXHaAMg5u7uuK0MaAGjT9KH6pgSDytXQxc4OQ-ZzG0xtexkZoGpNsE7_6Al_ZiDQp5I0MgWk2UzYQUuBeYZQ9ohJ6-cHwIHJG9N7W7Vx0zQ1i0GJCMQWKvN0VT7q_ZzOyevgSc3aS4o9r5XdbVWxHia2J_rQW3aX5aUiFAY3TVOJbuRJDG70UG_B13VbvKU"
							/>
						</div>
						<div>
							<p className="font-medium text-black text-sm dark:text-white">
								Admin User
							</p>
							<p className="text-black/60 text-xs dark:text-white/60">
								admin@liteclient.com
							</p>
						</div>
					</div>
				</div>
			</aside>
			<main className="flex-1 bg-background-light p-8 dark:bg-background-dark/80">
				<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
					<div className="mb-8">
						<h1 className="font-bold text-3xl text-black tracking-tight dark:text-white">
							{customer.user_id}
						</h1>
					</div>
					<div className="space-y-6">
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
							<div className="rounded-lg border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-background-dark">
								<h3 className="font-medium text-black text-lg dark:text-white">
									Spend
								</h3>
								<p className="mt-2 font-bold text-3xl text-black dark:text-white">
									${customer.spend.toFixed(2)}
								</p>
							</div>
							<div className="rounded-lg border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-background-dark">
								<h3 className="font-medium text-black text-lg dark:text-white">
									Max Budget
								</h3>
								<p className="mt-2 font-bold text-3xl text-black dark:text-white">
									$
									{customer.max_budget ? customer.max_budget.toFixed(2) : "N/A"}
								</p>
							</div>
						</div>
						<div>
							<h3 className="font-medium text-black text-lg dark:text-white">
								Budgets
							</h3>
							<div className="mt-4 overflow-x-auto rounded-lg border border-black/10 bg-white dark:border-white/10 dark:bg-background-dark">
								<table className="min-w-full table-auto">
									<thead className="border-black/10 border-b dark:border-white/10">
										<tr>
											<th className="px-6 py-3 text-left font-medium text-black/60 text-xs uppercase tracking-wider dark:text-white/60">
												Budget ID
											</th>
											<th className="px-6 py-3 text-left font-medium text-black/60 text-xs uppercase tracking-wider dark:text-white/60">
												Spend
											</th>
											<th className="px-6 py-3 text-left font-medium text-black/60 text-xs uppercase tracking-wider dark:text-white/60">
												Max Budget
											</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-black/10 dark:divide-white/10">
										{customer.budgets.map((budget) => (
											<tr key={budget.budget_id}>
												<td className="whitespace-nowrap px-6 py-4 font-medium text-black text-sm dark:text-white">
													{budget.budget_id}
												</td>
												<td className="whitespace-nowrap px-6 py-4 text-black/60 text-sm dark:text-white/60">
													${budget.spend.toFixed(2)}
												</td>
												<td className="whitespace-nowrap px-6 py-4 text-black/60 text-sm dark:text-white/60">
													$
													{budget.max_budget
														? budget.max_budget.toFixed(2)
														: "N/A"}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default CustomerDetailPage;
