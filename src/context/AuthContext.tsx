"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
	useCallback,
	useRef,
} from "react";
import {
	login as loginService,
	logout as logoutService,
} from "@/services/auth/authServices";
import { getCurrentUser } from "@/services/users/userService";
import { useRouter } from "next/navigation";
import { getDepartments } from "@/services/departments/departmentService";

type User = {
	id: string;
	email: string;
	name: string;
	role?: string;
	profile_picture?: string;
};

type AuthContextType = {
	user: User | null;
	loading: boolean;
	error: string | null;
	login: (email: string, password: string) => Promise<boolean>;
	logout: () => Promise<boolean>;
	refreshUser: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();
	const refreshInProgress = useRef(false);
	const userRef = useRef<User | null>(null);
	const initialLoadCompleted = useRef(false);

	// Update ref when user state changes
	useEffect(() => {
		userRef.current = user;
	}, [user]);

	const refreshUser = useCallback(async (): Promise<boolean> => {
		// If a refresh is already in progress, don't start another one
		if (refreshInProgress.current) {
			return !!userRef.current;
		}

		refreshInProgress.current = true;
		try {
			const response = await getCurrentUser();

			// Check if we have a successful response with data
			if (response && response.data) {
				setUser(response.data);
				return true;
			}

			return false;
		} catch (error) {
			console.error("Failed to fetch user:", error);
			// Don't show errors for auth failures on public pages
			setUser(null);
			return false;
		} finally {
			refreshInProgress.current = false;
			// Mark initial load as completed
			initialLoadCompleted.current = true;
		}
	}, []);

	useEffect(() => {
		let isMounted = true;
		const initAuth = async () => {
			if (!isMounted) return;
			setLoading(true);
			try {
				await refreshUser();
				// No need to handle failure case - just silently allow guest access
			} catch (error) {
				console.error("Auth initialization error:", error);
				// Don't set error state for auth failures - this allows guest access
			} finally {
				if (isMounted) {
					setLoading(false);
				}
			}
		};

		initAuth();

		return () => {
			isMounted = false;
		};
	}, [refreshUser]);

	const login = async (email: string, password: string) => {
		setError(null);
		try {
			const response = await loginService(email, password);
			if (response.status === 201 || response.message === "Login successful") {
				const userRefreshed = await refreshUser();

				// Pre-fetch departments after successful login
				if (userRefreshed) {
					try {
						await getDepartments();
					} catch (error) {
						console.error("Failed to pre-fetch departments:", error);
					}
				}

				return userRefreshed;
			} else {
				setError("Login failed");
				return false;
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message);
			} else if (
				typeof error === "object" &&
				error !== null &&
				"message" in error
			) {
				setError((error as { message: string }).message);
			} else {
				setError("An unexpected error occurred");
			}
			return false;
		}
	};

	const logout = async () => {
		try {
			await logoutService();
			setUser(null);
			router.push("/auth/login");
			return true;
		} catch (error) {
			console.error("Logout error:", error);
			return false;
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				// Only show loading state on initial load
				loading: loading && !initialLoadCompleted.current,
				error,
				login,
				logout,
				refreshUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
