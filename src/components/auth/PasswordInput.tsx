import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import { cn } from "@/lib/utils";

interface PasswordInputProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	showPwdMeter?: boolean;
	className?: string;
	disabled?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
	value,
	onChange,
	placeholder = "Enter password",
	showPwdMeter = false,
	className,
	disabled = false,
}) => {
	const [showPassword, setShowPassword] = useState(false);

	const handleTogglePassword = () => setShowPassword(!showPassword);

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleTogglePassword();
		}
	};

	return (
		<div className={className}>
			<div className="relative w-full">
				<div
					className={cn(
						"w-full flex flex-1 transition-all duration-200",
						"mt-1 bg-gray-700 border border-gray-600 rounded-md",
						"focus-within:outline-none focus-within:ring-2 focus-within:ring-teal-500",
						disabled && "opacity-50 cursor-not-allowed"
					)}
				>
					<input
						type={showPassword ? "text" : "password"}
						placeholder={placeholder}
						value={value}
						onChange={(e) => onChange(e.target.value)}
						disabled={disabled}
						className="w-full px-3 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none disabled:cursor-not-allowed"
						onPaste={(e) => e.preventDefault()}
					/>
					<button
						type="button"
						onClick={handleTogglePassword}
						onKeyDown={handleKeyDown}
						disabled={disabled}
						className="absolute inset-y-0 right-0 flex items-center pr-3 disabled:cursor-not-allowed"
						tabIndex={0}
						aria-label={showPassword ? "Hide password" : "Show password"}
					>
						{showPassword ? (
							<EyeOff className="h-5 w-5 text-gray-400" />
						) : (
							<Eye className="h-5 w-5 text-gray-400" />
						)}
					</button>
				</div>
			</div>
			{showPwdMeter && (
				<div className="px-1 mt-1.5">
					<PasswordStrengthMeter password={value} />
				</div>
			)}
		</div>
	);
};

export default PasswordInput;
