// components/forms/fields/TextareaField.tsx
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import type { Control, FieldValues, Path } from "react-hook-form";

interface TextareaFieldProps<T extends FieldValues> {
	control: Control<T>;
	name: Path<T>;
	label: string;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
}

export function TextareaField<T extends FieldValues>({
	control,
	name,
	label,
	placeholder,
	disabled,
	className,
}: TextareaFieldProps<T>) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Textarea
							{...field}
							placeholder={placeholder}
							disabled={disabled}
							className={`${className} resize-none`}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
