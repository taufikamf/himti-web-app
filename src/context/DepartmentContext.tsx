"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
	useRef,
} from "react";
import {
	Department,
	getDepartments,
} from "@/services/departments/departmentService";

type DepartmentContextType = {
	departments: Department[];
	loading: boolean;
	error: string | null;
	refreshDepartments: () => Promise<void>;
};

const DepartmentContext = createContext<DepartmentContextType | undefined>(
	undefined
);

export const DepartmentProvider = ({ children }: { children: ReactNode }) => {
	const [departments, setDepartments] = useState<Department[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const isRefreshing = useRef(false);

	const refreshDepartments = async () => {
		// Prevent concurrent refreshes
		if (isRefreshing.current) {
			return;
		}

		isRefreshing.current = true;
		setLoading(true);
		setError(null);

		try {
			const data = await getDepartments();
			// Ensure we're setting an array
			if (Array.isArray(data)) {
				setDepartments(data);
			} else {
				console.error("API returned non-array data:", data);
				setDepartments([]);
				setError("Invalid department data format");
			}
		} catch (error) {
			console.error("Failed to fetch departments:", error);
			setError("Failed to load departments");
			setDepartments([]); // Ensure departments is always an array
		} finally {
			setLoading(false);
			isRefreshing.current = false;
		}
	};

	useEffect(() => {
		let isMounted = true;

		const initDepartments = async () => {
			if (!isMounted) return;

			try {
				await refreshDepartments();
			} catch (error) {
				console.error("Department initialization error:", error);
				if (isMounted) {
					setDepartments([]);
					setError("Failed to initialize departments");
					setLoading(false);
				}
			}
		};

		initDepartments();

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<DepartmentContext.Provider
			value={{
				departments: Array.isArray(departments) ? departments : [],
				loading,
				error,
				refreshDepartments,
			}}
		>
			{children}
		</DepartmentContext.Provider>
	);
};

export const useDepartments = () => {
	const context = useContext(DepartmentContext);
	if (context === undefined) {
		throw new Error("useDepartments must be used within a DepartmentProvider");
	}
	return context;
};
