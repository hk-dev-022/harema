"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";

export default function LoginPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();
	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();

		const CORRECT_USERNAME = "guest-pf";
		const CORRECT_PASSWORD = "select-member-only";

		if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
			document.cookie = "portfolio_auth=true; path=/; max-age=86400; SameSite=Strict";
			setError("");

			router.push("/");
			router.refresh();
		} else {
			setError("ユーザー名またはパスワードが間違っています。\nIncorrect username or password.");
		}
	};

	return (
		<Container className="min-h-[calc(100vh-250px)] flex flex-col items-center justify-center lg:min-h-[calc(100vh-400px)]">
			<div className="w-full max-w-xs bg-white rounded-xl shadow-sm">
				<h1 className="text-lg font-bold text-center mb-6">Login</h1>
				
				<form onSubmit={handleLogin} className="space-y-4">
					{/* 💡 【新設】ユーザー名の入力欄 */}
					<div>
						<label className="block text-xs font-medium mb-2">
							Username
						</label>
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className="w-full text-sm bg-[#F2F2F2] px-4 py-2.5 focus:outline-none focus:border-black transition"
							placeholder="Enter username"
							required
						/>
					</div>
	
					{/* パスワードの入力欄 */}
					<div>
						<label className="block text-xs font-medium mb-2">
							Password
						</label>
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full text-sm bg-[#F2F2F2] pl-4 pr-14 py-2.5 focus:outline-none focus:border-black transition"
								placeholder="Enter password"
								required
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold select-none"
							>
								{showPassword ? "Hide" : "Show"}
							</button>
						</div>
					</div>
	
					{/* エラーメッセージ */}
					{error && (
						<p className="text-[0.6875rem] text-red-600 text-center leading-relaxed whitespace-pre-wrap">{error}</p>
					)}
	
					<button
						type="submit"
						className="w-full bg-black text-white text-xs font-bold py-4 !mt-10 hover:opacity-60"
					>
						Login
					</button>
				</form>
			</div>
		</Container>
	);
}