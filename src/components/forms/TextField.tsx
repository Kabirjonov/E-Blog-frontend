// components/forms/fields/TextField.tsx
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Control, FieldValues, Path } from "react-hook-form";
interface TextFieldProps<T extends FieldValues> {
	control: Control<T>;
	name: Path<T>;
	label: string;
	placeholder?: string;
	disabled?: boolean;
	clasName?: string;
}
export function TextField<T extends FieldValues>({
	control,
	name,
	label,
	placeholder,
	disabled,
	clasName,
}: TextFieldProps<T>) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Input
							{...field}
							placeholder={placeholder}
							disabled={disabled}
							className={`${clasName}`}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
