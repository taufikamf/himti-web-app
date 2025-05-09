import Link from "next/link";
import { AlertCircle } from "lucide-react";

interface ErrorPageProps {
	title?: string;
	message?: string;
	buttonText?: string;
	buttonHref?: string;
	onRetry?: () => void;
}

export default function ErrorPage({
	title = "Oops! Something went wrong",
	message = "We encountered an error while processing your request.",
	buttonText = "Try Again",
	buttonHref,
	onRetry,
}: ErrorPageProps) {
	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<div className="text-center max-w-md">
				<div className="mb-6 flex justify-center">
					<AlertCircle className="h-16 w-16 text-red-500" />
				</div>
				<h2 className="text-2xl font-bold mb-3">{title}</h2>
				<p className="text-white/70 mb-6">{message}</p>

				{buttonHref ? (
					<Link
						href={buttonHref}
						className="px-4 py-2 bg-primary text-foreground rounded-md hover:bg-opacity-80 transition-colors inline-block"
					>
						{buttonText}
					</Link>
				) : onRetry ? (
					<button
						onClick={onRetry}
						className="px-4 py-2 bg-primary text-foreground rounded-md hover:bg-opacity-80 transition-colors"
					>
						{buttonText}
					</button>
				) : null}
			</div>
		</div>
	);
}
