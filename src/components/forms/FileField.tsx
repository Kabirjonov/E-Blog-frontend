// components/forms/fields/FileField.tsx
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
// import type { Control, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";

interface FileFieldProps {
	control: any;
	name: any;
	label: string;
	disabled?: boolean;
	accept?: string;
	className?: string;
}
export function FileField({
	control,
	name,
	label,
	disabled,
	accept,
	className,
}: FileFieldProps) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field: { onChange } }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Input
							type='file'
							disabled={disabled}
							accept={accept}
							className={`${className}`}
							onChange={e => {
								const file = e.target.files?.[0];
								onChange(file);
							}}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
